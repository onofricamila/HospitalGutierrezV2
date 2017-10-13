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
            || (!isset($_POST['titulo1']) || ($titulo1 = trim($_POST['titulo1'])) == "")
            || (!isset($_POST['titulo2']) || ($titulo2 = trim($_POST['titulo2'])) == "")
            || (!isset($_POST['titulo3']) || ($titulo3 = trim($_POST['titulo3'])) == "")
            || (!isset($_POST['descripcion1']) || ($descripcion1 = trim($_POST['descripcion1'])) == "")
            || (!isset($_POST['descripcion2']) || ($descripcion2 = trim($_POST['descripcion2'])) == "")
            || (!isset($_POST['descripcion3']) || ($descripcion3 = trim($_POST['descripcion3'])) == "")
            || (!isset($_POST['email']) || ($email = trim($_POST['email'])) == "")
            || (!isset($_POST['elementos']) || ($elementos =trim($_POST['elementos'])) == ""))
        {
            echo 'No llenaste bien los campos';
            die;
        }

        $config = Configuration::getInstance();

        $config->updateUser($titulo, $titulo1, $titulo2, $titulo3, $descripcion1, $descripcion2, $descripcion3, $email, $elementos);

        $this->admin();
    }

    public function index() {
        $context = [];
        $path = '/config/mantenimiento.html.twig';
        $context['stylesheets'] = ['/public/css/config-mantenimiento.css'];
        TwigController::renderTwig($path, $context);
}

    public function admin() {
        if (!AppController::getInstance()->checkPermissions('configuracion_index')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }

        $context = $this->getCardInfo();
        $context['mantenimiento'] = $this->mantenimiento();
        $path = '/config/admin.html.twig';
        $context['stylesheets'] = ['/public/css/config-admin.css'];
        $context['javascripts'] = ['/public/js/config-admin.js'];
        TwigController::renderTwig($path, $context);
    }

    public static function mantenimiento() {
        return Configuration::getInstance()->mantenimiento;
    }

    public static function permission($controller, $action) {
        $isLogged = AppController::isLogged();
        if ($controller == 'Login' && ($action == 'logout' || $action == 'index' || $action="login")) {
            return true;
        }

        if ($controller == 'Config' && ($action == 'update' || $action == 'admin' || $action == 'togglemantenimiento')) {
            return true;
        }

        return false;
    }
    
    public function getCardInfo() {
        return Configuration::getInstance()->getCardInfo();
    }

    public function togglemantenimiento() {
        if (!AppController::getInstance()->checkPermissions('configuracion_update')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }
        Configuration::getInstance()->togglemantenimiento();
        $this->admin();
    }
}
