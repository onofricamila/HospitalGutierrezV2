<?php
    class Paciente {
        public $idPaciente, $apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio;

        public static function getPaciente($idPaciente) {
            $connection = Connection::getInstance();

            $query = $connection->prepare("SELECT * FROM paciente WHERE idPaciente=? ");
            $result = $query->execute($idPaciente);

            if ($result->num_rows  == 1) {
                return (new self($result->fetch_assoc()));
            }
            return false;
        }

        public function __construct($array) {
            $this->baseBuild($array);
        }

        public function baseBuild($array) {
            $this
                ->$idPaciente = $array['idPaciente']
                ->$apellido = $array['apellido']
                ->$nombre = $array['nombre']
                ->$fecha_nacimiento =  $array['fecha_nacimiento']
                ->$idGenero = $array['idGenero']
                ->$tipo_doc = $array['tipo_doc']
                ->$dni = $array['dni']
                ->$domicilio = $array['domicilio']
                ->$telefono = $array['telefono'];
                ->$idObraSocial = $array['idObraSocial'];
        }

       
    }
?>