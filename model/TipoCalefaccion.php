<?php
class TipoCalefaccion {
    public $idTipoCalefaccion, $nombre;

    public function __construct($idTipoCalefaccion) {
        $this->idTipoCalefaccion = $idTipoCalefaccion;
        $this->nombre = $this->buildNombre();
    }

    public function buildNombre() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT nombre FROM tipo_calefaccion WHERE idTipoCalefaccion=?");
        $query->execute(array($this->idTipoCalefaccion));

        if ($query->rowCount() == 1) {
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['nombre'];
        }
        return false;
    }
    public static function all() {
        $connection = Connection::getInstance();

        $result = $connection->query("SELECT * FROM tipo_calefaccion");

        $allTipoCalefaccion = [];

        if ($result->rowCount() > 0) {
            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                $allTipoCalefaccion[] = new TipoCalefaccion($row['idTipoCalefaccion']);
            }
            return $allTipoCalefaccion;
        }
        return false;
    }
}
?>