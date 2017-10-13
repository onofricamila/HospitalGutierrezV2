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
    
        public static function updatePaciente($idPaciente, $apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio, $heladera, $electricidad, $mascota, $idTipoVivienda, $idTipoCalefaccion, $idTipoAgua) {
            $connection = Connection::getInstance();
            
            $query = $connection->prepare("UPDATE paciente SET apellido=:apellido, nombre=:nombre, fecha_nacimiento=:fecha_nacimiento, idGenero=:idGenero, idTipoDoc=:idTipoDoc, dni=:dni, telefono=:telefono, idObraSocial=:idObraSocial, domicilio=:domicilio, heladera=:heladera, electricidad=:electricidad, mascota=:mascota, idTipoVivienda=:idTipoVivienda, idTipoCalefaccion=:idTipoCalefaccion, idTipoAgua=:idTipoAgua WHERE idPaciente=:idPaciente");
            $query->execute(array(':apellido' => $apellido, 
                                    ':nombre' => $nombre, 
                                    ':idPaciente' => $idPaciente, 
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

        public static function deletePaciente($idPaciente) {
            $connection = Connection::getInstance();
    
            $query = $connection->prepare("DELETE FROM paciente WHERE idPaciente=?");
            $query->execute(array($idPaciente));
            
            return $query->rowCount() == 1;
        }

        public static function all($args) {
            echo "los args son: ";
            var_dump($args);
            
            $query = "SELECT * FROM paciente WHERE 1 = 1";
            $array = array();
    
            if (array_key_exists("nombre", $args)) {
                $array[':nombre'] = "%".$args['nombre']."%";
                $query = $query." AND nombre LIKE :nombre";
            }

            if (array_key_exists("apellido", $args)) {
                $array[':apellido'] = "%".$args['apellido']."%";
                $query = $query." AND apellido LIKE :apellido";
            }

            if (array_key_exists("dni", $args)) {
                $array[':dni'] = "%".$args['dni']."%";
                $query = $query." AND dni LIKE :dni";
            }
    
            if (array_key_exists("idTipoDoc", $args)) {
                $array[':idTipoDoc'] = $args['idTipoDoc'];
                $query = $query." AND idTipoDoc = :idTipoDoc";
            }
    
            $connection = Connection::getInstance();
    
            $query = $connection->prepare($query);
            $query->execute($array);
    
            $allPaciente = [];
    
            if ($query->rowCount() > 0) {
                while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
                    $allPaciente[] = new Paciente($row);
                }
                return $allPaciente;
            }
            return false;
        }
    
    }
?>