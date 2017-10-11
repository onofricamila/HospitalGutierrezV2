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
                ->idPaciente = $array['idPaciente']
                ->apellido = $array['apellido']
                ->nombre = $array['nombre']
                ->fecha_nacimiento =  $array['fecha_nacimiento']
                ->idGenero = $array['idGenero']
                ->tipo_doc = $array['tipo_doc']
                ->dni = $array['dni']
                ->domicilio = $array['domicilio']
                ->telefono = $array['telefono']
                ->idObraSocial = $array['idObraSocial'];
        }
       
        public static function newPaciente($apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio) {
            $connection = Connection::getInstance();
    
            $query = $connection->prepare("INSERT INTO usuario (apellido, nombre, fecha_nacimiento, idGenero, idTipoDoc, dni, telefono, idObraSocial, domicilio) VALUES (?, ?, ?, ?, ?, ?)");
            $query->execute(array($apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio));
            
            return $query->rowCount() == 1;
        }
    
        public function updatePaciente($idPaciente, $apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio) {
            $connection = Connection::getInstance();
            
            $query = $connection->prepare("UPDATE usuario SET apellido = ". $apellido . ", nombre = ". $nombre . ", fecha_nacimiento = ". $fecha_nacimiento . ", idGenero = ". $idGenero . ", idTipoDoc = ". $idTipoDoc . ", dni = ". $dni . ", telefono = ". $telefono . ", idObraSocial = ". $idObraSocial . ", domicilio = ". $domicilio . " WHERE idPaciente=?");
            $query->execute(array($this->idPaciente));
    
            return $query->rowCount() == 1;
        }

        public static function deletePaciente($idPaciente) {
            $connection = Connection::getInstance();
    
            $query = $connection->prepare("DELETE FROM paciente WHERE idPaciente=?");
            $query->execute(array($idPaciente));
            
            return $query->rowCount() == 1;
        }

        public static function all() {
            $connection = Connection::getInstance();
    
            $result = $connection->query("SELECT * FROM paciente");
    
            $pacientes = [];
    
            if ($result->rowCount() > 0) {
                while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                    $pacientes[] = new Paciente($row);
                }
                return $pacientes;
            }
            return false;
        }
    
    }
?>