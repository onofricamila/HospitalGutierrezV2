<?php
    class User {
        public $id, $email, $username, $password, $active, $updated_at, $created_at, $first_name, $last_name, $roles;

        public static function login($user, $pass) {
            $connection = Connection::getInstance();

            $query = $connection->prepare("SELECT * FROM usuario WHERE username=? AND password=?");
            $result = $query->execute(array($user, $pass));

            if ($result->num_rows  == 1) {
                return (new self($result->fetch_assoc()));
            }
            return false;
        }

        public function __construct($array) {
            $this->baseBuild($array);
            $this->getRol();
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
            $this->permissions = [];
        }

        public function getRol() {
            $connection = Connection::getInstance();
            
            $query = $connection->prepare("SELECT * FROM usuario_tiene_rol WHERE usuario_id=?");
            $result = $query->execute(array($this->$id));

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $this->roles[] = Rol::id($row['id']);
                }
                return true;
            }
            return false;
        }
    }
    