<?php
require_once 'UserBase.php';

class User extends UserBase {
    public $id, $email, $username, $password, $active, $updated_at, $created_at, $first_name, $last_name;

    public static function id($id) {
        $connection = Connection::getInstance();

        $query = $connection->prepare("SELECT * FROM usuario WHERE id=?");
        $result = $query->execute(array($id));

        if ($result->num_rows == 1) {
            return (new User($result->fetch_assoc()));
        }
        return false;
    }

    public static function login($user, $pass) {
        $connection = Connection::getInstance();

        $query = $connection->prepare("SELECT * FROM usuario WHERE username=? AND password=?");
        $result = $query->execute(array($user, $pass));

        var_dump($result);
        die;
        if ($result->num_rows == 1) {
            return (new User($result->fetch_assoc()));
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
        $this
            ->$id = $array['id']
            ->$email = $array['email']
            ->$username = $array['username']
            ->$password =  $array['password']
            ->$active = $array['active']
            ->$updated_at = $array['updated_at']
            ->$created_at = $array['created_at']
            ->$first_name = $array['first_name']
            ->$last_name = $array['last_name'];
        $this->roles = [];
    }

    public function buildRoles() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT * FROM usuario_tiene_rol WHERE usuario_id=?");
        $result = $query->execute(array($this->$id));

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $this->roles[] = new Rol($row['rol_id']);
            }
            return true;
        }
        return false;
    }
}
