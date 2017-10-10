<?php
class Permission {
    public $id, $nombre;

    public function __construct($id) {
        $this
            ->$id = $id
            ->$nombre = getNombre();
    }

    public function buildNombre() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT nombre FROM permiso WHERE id=?");
        $result = $query->execute(array($this->$id));

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            return $row['nombre'];
        }
        return false;
    }

    public function checkPermissions($permission) {
        return ($this->$nombre == $permission);
    }

}
