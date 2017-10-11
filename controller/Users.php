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
        if (!App::getInstance()->checkPermissions('usuario_index')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }

        if ($users = User::all()) {
            require_once 'view/header.html';
            require_once 'view/navbar.php';
            require_once '/view/users/index.php';
            require_once 'view/footer.html';
        }
    }

}