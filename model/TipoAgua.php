<?php
class TipoAgua {
    public $idTipoAgua, $nombre;

    public function __construct($idTipoAgua) {
        $this->idTipoAgua = $idTipoAgua;
        $this->nombre = $this->buildNombre();
    }

    public function buildNombre() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT nombre FROM permiso WHERE idTipoAgua=?");
        $query->execute(array($this->idTipoAgua));

        if ($query->rowCount() == 1) {
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['nombre'];
        }
        return false;
    }

}
?>