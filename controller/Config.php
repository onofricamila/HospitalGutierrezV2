<?php
require_once './model/Config.php';

class ConfigController {
    private static $instance;
    
    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct() {}
    
    public static function getConfiguration() {
        return Configuration::getInstance();
    }

    public static function updateConfiguration() {
        if (!AppController::getInstance()->checkPermissions('configuracion_update')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }

        if ((!isset($_POST['titulo']) || ($titulo = trim($_POST['titulo'])) == "")
            || (!isset($_POST['descripcion1']) || ($descripcion1 = trim($_POST['descripcion1'])) == "")
            || (!isset($_POST['descripcion2']) || ($descripcion2 = trim($_POST['descripcion2'])) == "")
            || (!isset($_POST['descripcion3']) || ($descripcion3 = trim($_POST['descripcion3'])) == "")
            || (!isset($_POST['email']) || ($email = trim($_POST['email'])) == "")
            || (!isset($_POST['elementos']) || ($elementos =trim($_POST['elementos'])) == "")
            || (!isset($_POST['mantenimiento'])) || ($mantenimiento = trim($_POST['mantenimiento'])) == "")
        {
            echo 'No llenaste bien los campos';
            die;
        }

        $config = Configuration::getInstance();

        $config->updateUser($titulo, $descripcion1, $descripcion2, $descripcion3, $email, $elementos, $mantenimiento);

        $this->index();
    }

    public function index() {
        echo "Config index, todavia no lo hice.";
        die;
    }

    public function admin() {
        echo "Config admin, todavia no lo hice.";
        die;
    }
}
