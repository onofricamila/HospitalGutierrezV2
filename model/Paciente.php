<?php
    class Paciente {
        public $idPaciente, $apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio, $heladera, $electricidad, $mascota, $idTipoVivienda, $idTipoCalefaccion, $idTipoAgua;

        public static function getPaciente($idPaciente) {
            $connection = Connection::getInstance();
    
            $query = $connection->prepare("SELECT * FROM paciente WHERE idPaciente=?");
            $query->execute(array($idPaciente));
            
            if ($query->rowCount() == 1) {
                return (new Paciente($query->fetch(PDO::FETCH_ASSOC)));
            }
            return false;
        }

        public function __construct($array) {
            $this->baseBuild($array);
        }

        public function baseBuild($array) {
            $this ->idPaciente = $array['idPaciente'];
            $this ->apellido = $array['apellido'];
            $this ->nombre = $array['nombre'];
            $this ->fecha_nacimiento =  $array['fecha_nacimiento'];
            $this ->idGenero = $array['idGenero'];
            $this ->idTipoDoc = $array['idTipoDoc'];
            $this ->dni = $array['dni'];
            $this ->domicilio = $array['domicilio'];
            $this ->telefono = $array['telefono'];
            $this ->idObraSocial = $array['idObraSocial'];
            $this ->heladera = $array['heladera'];
            $this ->electricidad = $array['electricidad'];
            $this ->mascota = $array['mascota'];
            $this ->idTipoVivienda = $array['idTipoVivienda'];
            $this ->idTipoCalefaccion = $array['idTipoCalefaccion'];
            $this ->idTipoAgua = $array['idTipoAgua'];
        }
       
        public static function newPaciente($apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio, $heladera, $electricidad, $mascota, $idTipoVivienda, $idTipoCalefaccion, $idTipoAgua) {
            $connection = Connection::getInstance();

           $query = $connection->prepare("INSERT INTO paciente (apellido, nombre, fecha_nacimiento, idGenero, idTipoDoc, dni, telefono, idObraSocial, domicilio, heladera, electricidad, mascota, idTipoVivienda, idTipoCalefaccion, idTipoAgua) 
            VALUES (:apellido, :nombre, :fecha_nacimiento, :idGenero, :idTipoDoc, :dni, :telefono, :idObraSocial, :domicilio, :heladera, :electricidad, :mascota, :idTipoVivienda, :idTipoCalefaccion, :idTipoAgua)");
           
           $query->execute(array(':apellido' => $apellido, 
                ':nombre' => $nombre, 
                ':fecha_nacimiento' => $fecha_nacimiento, 
                ':idGenero' => $idGenero, 
                ':idTipoDoc' => $idTipoDoc, 
                ':dni' => $dni, 
                ':telefono' => $telefono, 
                ':idObraSocial' => $idObraSocial, 
                ':domicilio' => $domicilio, 
                ':heladera' => $heladera, 
                ':idTipoVivienda' => $idTipoVivienda, 
                ':idTipoCalefaccion' => $idTipoCalefaccion, 
                ':idTipoAgua' => $idTipoAgua, 
                ':electricidad' => $electricidad, 
                ':mascota' => $mascota));

            return $query->rowCount() == 1;
        }
    
        public function updatePaciente($idPaciente, $apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio, $heladera, $electricidad, $mascota, $idTipoVivienda, $idTipoCalefaccion, $idTipoAgua) {
            $connection = Connection::getInstance();
            
            $query = $connection->prepare("UPDATE usuario SET apellido = ". $apellido . ", nombre = ". $nombre . ", fecha_nacimiento = ". $fecha_nacimiento . ", idGenero = ". $idGenero . ", idTipoDoc = ". $idTipoDoc . ", dni = ". $dni . ", telefono = ". $telefono . ", idObraSocial = ". $idObraSocial . ", domicilio = ". $domicilio . ", heladera = ". $heladera . ", electricidad = ". $electricidad . ", mascota = ". $mascota . ", idTipoVivienda = ". $idTipoVivienda . ", idTipoCalefaccion = ". $idTipoCalefaccion . ", idTipoAgua = ". $idTipoAgua . " WHERE idPaciente=?");
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