<?php
require_once 'UserBase.php';

class User extends UserBase {
    public $id, $email, $username, $password, $active, $updated_at, $created_at, $first_name, $last_name;

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
        return false;
    }

    public static function all() {
        $connection = Connection::getInstance();

        $result = $connection->query("SELECT * FROM usuario");

        $users = [];

        if ($result->num_rows > 1) {
            while ($row = $result->fetch_assoc()) {
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
        $this->active = $array['active'];
        $this->updated_at = $array['updated_at'];
        $this->created_at = $array['created_at'];
        $this->first_name = $array['first_name'];
        $this->last_name = $array['last_name'];
        $this->roles = [];
    }

    public function buildRoles() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT * FROM usuario_tiene_rol WHERE usuario_id=?");
        $result = $query->execute(array($this->$id));

        if ($query->rowCount > 0) {
            while ($row = $result->fetch_assoc()) {
                $this->roles[] = new Rol($row['rol_id']);
            }
            return true;
        }
        return false;
    }
}
