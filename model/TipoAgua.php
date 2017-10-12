<?php
class TipoAgua {
    public $idTipoAgua, $nombre;

    public function __construct($idTipoAgua) {
        $this->idTipoAgua = $idTipoAgua;
        $this->nombre = $this->buildNombre();
    }

    public function buildNombre() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT nombre FROM tipo_agua WHERE idTipoAgua=?");
        $query->execute(array($this->idTipoAgua));

        if ($query->rowCount() == 1) {
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['nombre'];
        }
        return false;
    }

    public static function all() {
        $connection = Connection::getInstance();

        $result = $connection->query("SELECT * FROM tipo_agua");

        $allTipoAgua = [];

        if ($result->rowCount() > 0) {
            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                $allTipoAgua[] = new TipoAgua($row['idTipoAgua']);
            }
            return $allTipoAgua;
        }
        return false;
    }
}
?>