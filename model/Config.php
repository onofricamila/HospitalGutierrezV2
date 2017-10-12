<?php
class Configuration {
    private static $instance;
    public $id, $titulo, $descripcion1, $descripcion2, $descripcion3, $email, $elementos, $mantenimiento;
    
    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct() {
        $connection = Connection::getInstance();

        $query = $connection->prepare("SELECT * FROM configuracion");
        $query->execute();
        
        if ($query->rowCount() == 1) {
            return $this->baseBuild($query->fetch(PDO::FETCH_ASSOC));
        }
        return false;
    }

    public function baseBuild($data) {
        $this->id = $data['id'];
        $this->titulo = $data['titulo'];
        $this->descripcion1 = $data['descripcion1'];
        $this->descripcion2 = $data['descripcion2'];
        $this->descripcion3 = $data['descripcion3'];
        $this->email = $data['email'];
        $this->elementos = $data['elementos'];
        $this->mantenimiento = $data['mantenimiento'];
    }

    public function update($titulo, $descripcion1, $descripcion2, $descripcion3, $email, $elementos, $mantenimiento) {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("UPDATE configuracion SET titulo=:titulo, descripcion1=:descripcion1, descripcion2=:descripcion2, descripcion3=:descripcion3, email=:email, elementos=:elementos, mantenimiento=:mantenimiento WHERE id=:id");
        $query->execute(array(':id' => $this->id,
                                ':titulo' => $titulo,
                                ':descripcion1' => $descripcion1,
                                ':descripcion2' => $descripcion2,
                                ':descripcion3' => $descripcion3,
                                ':email' => $email,
                                ':elementos' => $elementos,
                                ':mantenimiento' => $mantenimiento));
        if ($query->rowCount() == 1) {
            $this->reset();
            return true;
        }
        return false;
    }

    public function reset() {
        unset(self::$instance);
        return self::getInstance();
    }
}
