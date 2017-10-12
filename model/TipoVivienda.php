<?php
class TipoVivienda {
    public $idTipoVivienda, $nombre;

    public function __construct($idTipoVivienda) {
        $this->idTipoVivienda = $idTipoVivienda;
        $this->nombre = $this->buildNombre();
    }

    public function buildNombre() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT nombre FROM permiso WHERE idTipoVivienda=?");
        $query->execute(array($this->idTipoVivienda));

        if ($query->rowCount() == 1) {
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['nombre'];
        }
        return false;
    }

}
?>