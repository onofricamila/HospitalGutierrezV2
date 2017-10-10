<?php
    require_once './model/User.php';
    class LoginController {
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
            require_once 'view/header.html';
            require_once 'view/navbar.html';
            require_once 'view/login/login.html';
            require_once 'view/footer.html';
        }

        public function login(){
            $user = $_POST['user'];
            $pass = $_POST['pass'];
        }

    }
    