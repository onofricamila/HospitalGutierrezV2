<?php
    class DatosDemo {
        public $idDatosDemo, $idPaciente, $heladera, $electricidad, $mascota, $idTipoVivienda, $idTipoCalefaccion, $idTipoAgua;

        public static function getDatosDemo($idDatosDemo) {
            $connection = Connection::getInstance();

            $query = $connection->prepare("SELECT * FROM datos_demo WHERE idDatosDemo=? ");
            $result = $query->execute($idDatosDemo);

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
                ->idDatosDemo = $array['idDatosDemo']
                ->idPaciente = $array['idPaciente']
                ->heladera = $array['heladera']
                ->electricidad = $array['electricidad']
                ->mascota =  $array['mascota']
                ->idTipoVivienda = $array['idTipoVivienda']
                ->idTipoCalefaccion = $array['idTipoCalefaccion']
                ->idTipoAgua = $array['idTipoAgua'];
        }

       
    }
?>