<?php
class Configuration {
    private static $instance, $id, $titulo, $descripcion, $email, $elementos, $mantenimiento;
    
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
            return baseBuild($query->fetch(PDO::FETCH_ASSOC));
        }
        return false;
    }

    public function baseBuild($data) {
        $this->id = $array['id'];
        $this->titulo = $array['titulo'];
        $this->descripcion = $array['descripcion'];
        $this->email = $array['email'];
    }

    public function update($titulo, $descripcion, $email, $elementos, $mantenimiento) {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("UPDATE configuracion SET titulo=:titulo, descripcion=:descripcion, email=:email, elementos=:elementos, mantenimiento=:mantenimiento WHERE id=:id");
        $query->execute(array(':id' => $this->id,
                                ':titulo' => $titulo,
                                ':descripcion' => $descripcion,
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
