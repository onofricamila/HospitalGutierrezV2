<?php
class TipoVivienda {
    public $idTipoVivienda, $nombre;

    public function __construct($idTipoVivienda) {
        $this->idTipoVivienda = $idTipoVivienda;
        $this->nombre = $this->buildNombre();
    }

    public function buildNombre() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT nombre FROM tipo_vivienda WHERE idTipoVivienda=?");
        $query->execute(array($this->idTipoVivienda));

        if ($query->rowCount() == 1) {
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['nombre'];
        }
        return false;
    }
    public static function all() {
        $connection = Connection::getInstance();

        $result = $connection->query("SELECT * FROM tipo_vivienda");

        $allTipoVivienda = [];

        if ($result->rowCount() > 0) {
            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                $allTipoVivienda[] = new TipoVivienda($row['idTipoVivienda']);
            }
            return $allTipoVivienda;
        }
        return false;
    }
}
?>