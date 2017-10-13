<?php
require_once 'UserBase.php';

class User extends UserBase {
    public $id, $email, $username, $password, $active, $updated_at, $created_at, $first_name, $last_name;

    public static function newUser($email, $user, $pass, $first_name, $last_name) {
        $connection = Connection::getInstance();

        $query = $connection->prepare("INSERT INTO usuario (email, username, password, first_name, last_name) 
                                        VALUES (:email, :user, :pass, :first_name, :last_name)");
        $query->execute(array(':email' => $email, 
                                ':user' => $user, 
                                ':pass' => $pass, 
                                ':first_name' => $first_name, 
                                ':last_name' => $last_name));
        
        return $query->rowCount() == 1;
    }

    public static function deleteUser($id) {
        $connection = Connection::getInstance();

        $query = $connection->prepare("DELETE FROM usuario WHERE id=?");
        $query->execute(array(intval($id)));

        return $query->rowCount() == 1;
    }

    public static function id($id) {
        $connection = Connection::getInstance();

        $query = $connection->prepare("SELECT * FROM usuario WHERE id=?");
        $query->execute(array($id));
        
        if ($query->rowCount() == 1) {
            return (new User($query->fetch(PDO::FETCH_ASSOC)));
        }
        return false;
    }

    public static function login($user, $pass) {
        $connection = Connection::getInstance();

        $query = $connection->prepare("SELECT * FROM usuario WHERE username=? AND password=?");
        $query->execute(array($user, $pass));

        if ($query->rowCount() == 1) {
            return (new User($query->fetch(PDO::FETCH_ASSOC)));
        }
        return new Guest;
    }

    public static function all($args) {
        $query = "SELECT * FROM usuario WHERE 1 = 1";
        $array = array();

        if (array_key_exists("search", $args)) {
            $array[':user'] = "%".$args['search']."%";
            $query = $query." AND username LIKE :user";
        }

        if (array_key_exists("active", $args) && ($args['active'] == 0 || $args['active'] == 1)) {
            $array[':active'] = $args['active'];
            $query = $query." AND activo = :active";
        }

        $connection = Connection::getInstance();

        $query = $connection->prepare($query);
        $query->execute($array);

        $users = [];

        if ($query->rowCount() > 0) {
            while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
                $users[] = new User($row);
            }
            return $users;
        }
        return false;
    }

    public function __construct($array) {
        $this->baseBuild($array);
        $this->buildRoles();
    }

    public function baseBuild($array) {
        $this->id = $array['id'];
        $this->email = $array['email'];
        $this->username = $array['username'];
        $this->password =  $array['password'];
        $this->active = $array['activo'];
        $this->updated_at = $array['updated_at'];
        $this->created_at = $array['created_at'];
        $this->first_name = $array['first_name'];
        $this->last_name = $array['last_name'];
        $this->roles = [];
    }

    public function buildRoles() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT * FROM usuario_tiene_rol WHERE usuario_id=?");
        $query->execute(array($this->id));

        if ($query->rowCount() > 0) {
            while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
                $this->roles[] = new Rol($row['rol_id']);
            }
            return true;
        }
        return false;
    }
    
    public function block() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("UPDATE usuario SET activo=0, updated_at=:updated WHERE id=:id");
        $query->execute(array(':id' => $this->id,
                                ':updated' => date("Y-m-d H:i:s")));

        return $query->rowCount() == 1;
    }

    public function activate() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("UPDATE usuario SET activo=1, updated_at=:updated WHERE id=:id");
        $query->execute(array(':id' => $this->id,
                                ':updated' => date("Y-m-d H:i:s")));

        return $query->rowCount() == 1;
    }

    public function togglestate() {
        if ($this->active) {
            return $this->block();
        }
        return $this->activate();
    }

    public function hasRol($rol) {
        foreach ($this->roles as $userRol) {
            if ($rol->id == $userRol->id) {
                return true;
            }
        }
        return false;
    }

    public function addRol($id) {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("INSERT INTO usuario_tiene_rol (usuario_id, rol_id) 
                                        VALUES (:usuario_id, :rol_id)");
        $query->execute(array(':usuario_id' => $this->id,
                                ':rol_id' => $id));
        
        return $query->rowCount() == 1;
    }

    public function deleteRol($id) {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("DELETE FROM usuario_tiene_rol WHERE usuario_id=:usuario_id AND rol_id=:rol_id");
        $query->execute(array(':usuario_id' => $this->id,
                                ':rol_id' => $id));
        
        return $query->rowCount() == 1;
    }

    public function updateUser($email, $user, $first_name, $last_name) {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("UPDATE usuario SET updated_at=:updated, email=:email, username=:user, first_name=:first_name, last_name=:last_name WHERE id=:id");
        $query->execute(array(':updated' => date("Y-m-d H:i:s"),
                                ':id' => $this->id,
                                ':email' => $email,
                                ':user' => $user,
                                ':first_name' => $first_name,
                                ':last_name' => $last_name));
        return $query->rowCount() == 1;
    }

    public function updatePass($pass) {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("UPDATE usuario SET updated_at=:updated, password=:pass WHERE id=:id");
        $query->execute(array(':updated' => date("Y-m-d H:i:s"),
                                ':id' => $this->id,
                                ':pass' => $pass));

        return $query->rowCount() == 1;
    }
}
