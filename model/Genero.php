<?php
class Genero {
    public $idGenero, $nombre;

    public function __construct($idGenero) {
        $this->idGenero = $idGenero;
        $this->nombre = $this->buildNombre();
    }

    public function buildNombre() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT nombre FROM genero WHERE idGenero=?");
        $query->execute(array($this->idGenero));

        if ($query->rowCount() == 1) {
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['nombre'];
        }
        return false;
    }

    

}
?>