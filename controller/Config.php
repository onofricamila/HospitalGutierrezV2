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
    
        AppController::allowed('configuracion_update');  
        
        if ((!isset($_POST['titulo']) || ($titulo = trim($_POST['titulo'])) == "" || strlen($titulo) < 4)
            || (!isset($_POST['titulo1']) || ($titulo1 = trim($_POST['titulo1'])) == "" || strlen($titulo1) < 4)
            || (!isset($_POST['titulo2']) || ($titulo2 = trim($_POST['titulo2'])) == "" || strlen($titulo2) < 4)
            || (!isset($_POST['titulo3']) || ($titulo3 = trim($_POST['titulo3'])) == "" || strlen($titulo3) < 4)
            || (!isset($_POST['descripcion1']) || ($descripcion1 = trim($_POST['descripcion1'])) == "" || strlen($descripcion1) < 4)
            || (!isset($_POST['descripcion2']) || ($descripcion2 = trim($_POST['descripcion2'])) == "" || strlen($descripcion2) < 4)
            || (!isset($_POST['descripcion3']) || ($descripcion3 = trim($_POST['descripcion3'])) == "" || strlen($descripcion3) < 4)
            || (!isset($_POST['email']) || ($email = trim($_POST['email'])) == "" || !filter_var($email, FILTER_VALIDATE_EMAIL))
            || (!isset($_POST['elementos']) || ($elementos =trim($_POST['elementos'])) == "" || $elementos < 1 ))
        {
            AppController::req_fields();
            
        }

        $config = Configuration::getInstance();

        $config->update($titulo, $titulo1, $titulo2, $titulo3, $descripcion1, $descripcion2, $descripcion3, $email, $elementos);

        $this->admin();
    }

    public function index() {
        $context = [];
        $path = '/config/mantenimiento.html.twig';
        $context['stylesheets'] = ['/public/css/config-mantenimiento.css'];
        $context['titulo'] = 'Mantenimiento';
        TwigController::renderTwig($path, $context);
}

    public function admin() {
    
        AppController::allowed('configuracion_index');  
        
        $context = $this->getCardInfo();
        $context['mantenimiento'] = $this->mantenimiento();
        $path = '/config/admin.html.twig';
        $context['stylesheets'] = ['/public/css/config-admin.css'];
        $context['javascripts'] = ['/public/js/config-admin.js','/public/js/pacientes.js', '/public/js/validacion.js'];
        $context['titulo'] = 'Configuracion';
        TwigController::renderTwig($path, $context);
        die;
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
     
        AppController::allowed('configuracion_update');  
        
        Configuration::getInstance()->togglemantenimiento();
        $this->admin();
    }

    public function getPaginacion() {
        return Configuracion::getInstance()->elementos;
    }
}
