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

    public function update() {
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

        $this->admin();
    }

    public function index() {
        $context = [];
        $path = '/config/mantenimiento.html.twig';
        $context['stylesheets'] = ['/public/css/config.css'];
        TwigController::renderTwig($path, $context);
}

    public function admin() {
        if (!AppController::getInstance()->checkPermissions('configuracion_index')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }

        echo "Administracion de configuracion, todavia no lo hice.";
        die;
    }

    public static function mantenimiento() {
        return Configuration::getInstance()->mantenimiento;
    }

    public static function permission($controller, $action) {
        $isLogged = AppController::isLogged();

        if ($controller == 'User' && ($action == 'logout' || $action == 'login')) {
            return true;
        }

        if ($controller == 'Config' && ($action == 'update' || $action == 'admin')) {
            return true;
        }

        return false;
    }
}
