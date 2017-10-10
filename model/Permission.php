<?php
class Permission {
    public $id, $nombre;

    public function __construct($id) {
        $this->id = $id;
        $this->nombre = $this->buildNombre();
    }

    public function buildNombre() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT nombre FROM permiso WHERE id=?");
        $query->execute(array($this->id));

        if ($query->rowCount() == 1) {
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['nombre'];
        }
        return false;
    }

    public function checkPermissions($permission) {
        return ($this->nombre == $permission);
    }

}
