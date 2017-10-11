<?php
require_once './model/User.php';

class UsersController {
    private static $instance;
    
    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct() {

    }
    
    public function index(){
        if (!AppController::getInstance()->checkPermissions('usuario_index')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }

        if ($users = User::all()) {
            echo "Bien";
        }
        else {
            echo "Error";
        }
    }

}