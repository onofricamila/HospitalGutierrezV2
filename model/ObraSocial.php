<?php
class ObraSocial {
    public $idObraSocial, $nombre;

    public function __construct($idObraSocial) {
        $this->idObraSocial = $idObraSocial;
        $this->nombre = $this->buildNombre();
    }

    public function buildNombre() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT nombre FROM permiso WHERE idObraSocial=?");
        $query->execute(array($this->idObraSocial));

        if ($query->rowCount() == 1) {
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['nombre'];
        }
        return false;
    }

}
?>