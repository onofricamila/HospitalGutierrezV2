<?php
class TipoCalefaccion {
    public $idTipoCalefaccion, $nombre;

    public function __construct($idTipoCalefaccion) {
        $this->idTipoCalefaccion = $idTipoCalefaccion;
        $this->nombre = $this->buildNombre();
    }

    public function buildNombre() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT nombre FROM permiso WHERE idTipoCalefaccion=?");
        $query->execute(array($this->idTipoCalefaccion));

        if ($query->rowCount() == 1) {
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['nombre'];
        }
        return false;
    }

}
?>