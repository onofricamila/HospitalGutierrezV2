<?php
require_once 'Permission.php';

class Rol {
    public $id, $nombre, $permissions;

    public function __construct($id) {
        $this->id = $id;
        $this->nombre = $this->buildNombre();
        $this->permissions = [];
        $this->buildPermissions();
    }

    public function buildNombre() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT nombre FROM rol WHERE id=?");
        $query->execute(array($this->id));

        if ($query->rowCount() == 1) {
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['nombre'];
        }
        return false;
    }

    public function buildPermissions() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT * FROM rol_tiene_permiso WHERE rol_id=?");
        $query->execute(array($this->id));

        if ($query->rowCount() > 0) {
            while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
                $this->permissions[] = new Permission($row['permiso_id']);
            }
            return true;
        }
        return false;
    }

    public function checkPermissions($permission) {
        foreach ($this->permissions as $perm) {
            if ($perm->checkPermissions($permission)) return true;
        }
        return false;
    }
    public static function all() {
        $connection = Connection::getInstance();

        $query = $connection->prepare("SELECT * FROM rol");
        $query->execute();

        $roles = [];

        if ($query->rowCount() > 0) {
            while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
                $roles[] = new Rol($row['id']);
            }
            return $roles;
        }
        return false;
    }
}

