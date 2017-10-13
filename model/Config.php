<?php
class Configuration {
    private static $instance;
    public $id, $titulo, $titulo1, $titulo2, $titulo3, $descripcion1, $descripcion2, $descripcion3, $email, $elementos, $mantenimiento;
    
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
        $this->titulo1 = $data['titulo1'];
        $this->titulo2 = $data['titulo2'];
        $this->titulo3 = $data['titulo3'];
        $this->descripcion1 = $data['descripcion1'];
        $this->descripcion2 = $data['descripcion2'];
        $this->descripcion3 = $data['descripcion3'];
        $this->email = $data['email'];
        $this->elementos = $data['elementos'];
        $this->mantenimiento = $data['mantenimiento'];
    }

    public function update($titulo, $titulo1, $titulo2, $titulo3, $descripcion1, $descripcion2, $descripcion3, $email, $elementos) {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("UPDATE configuracion SET titulo=:titulo, 
                                                                titulo1=:titulo1, 
                                                                titulo2=:titulo2, 
                                                                titulo3=:titulo3, 
                                                                descripcion1=:descripcion1, 
                                                                descripcion2=:descripcion2, 
                                                                descripcion3=:descripcion3, 
                                                                email=:email, 
                                                                elementos=:elementos, 
                                                            WHERE id=:id");
        $query->execute(array(':id' => $this->id,
                                ':titulo' => $titulo,
                                ':titulo1' => $descripcion1,
                                ':titulo2' => $descripcion1,
                                ':titulo3' => $descripcion1,
                                ':descripcion1' => $descripcion1,
                                ':descripcion2' => $descripcion2,
                                ':descripcion3' => $descripcion3,
                                ':email' => $email,
                                ':elementos' => $elementos));
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

    public function getCardInfo() {
        $context = [];
        $context['cards'][] = array('titulo' => $this->titulo1, 'descripcion' => $this->descripcion1);
        $context['cards'][] = array('titulo' => $this->titulo2, 'descripcion' => $this->descripcion2);
        $context['cards'][] = array('titulo' => $this->titulo3, 'descripcion' => $this->descripcion3);
        return $context;
    }

    public function toggleMantenimiento() {

    }
}
