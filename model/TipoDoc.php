<?php
class TipoDoc {
    public $idTipoDoc, $nombre;

    public function __construct($idTipoDoc) {
        $this->idTipoDoc = $idTipoDoc;
        $this->nombre = $this->buildNombre();
    }

    public function buildNombre() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT nombre FROM tipo_doc WHERE idTipoDoc=?");
        $query->execute(array($this->idTipoDoc));

        if ($query->rowCount() == 1) {
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['nombre'];
        }
        return false;
    }

}
?>