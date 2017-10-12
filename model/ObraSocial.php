<?php
class ObraSocial {
    public $idObraSocial, $nombre;

    public function __construct($idObraSocial) {
        $this->idObraSocial = $idObraSocial;
        $this->nombre = $this->buildNombre();
    }

    public function buildNombre() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT nombre FROM obra_social WHERE idObraSocial=?");
        $query->execute(array($this->idObraSocial));

        if ($query->rowCount() == 1) {
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['nombre'];
        }
        return false;
    }
    public static function all() {
        $connection = Connection::getInstance();

        $result = $connection->query("SELECT * FROM obra_social");

        $allObraSocial = [];

        if ($result->rowCount() > 0) {
            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                $allObraSocial[] = new ObraSocial($row['idObraSocial']);
            }
            return $allObraSocial;
        }
        return false;
    }

}
?>