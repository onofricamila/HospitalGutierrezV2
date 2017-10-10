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
            if (AppController::getUser() instanceof User) {
                echo "Ya estas logueado!";
            }
            else {
                require_once 'view/header.html';
                require_once 'view/navbar.php';
                require_once 'view/login/login.html';
                require_once 'view/footer.html';
            }
        }

        public function login(){
            $user = $_POST['user'];
            $pass = $_POST['pass'];

            $_SESSION['loggedid'] = User::login($user, $pass)->id;

            header("Location: ".$_SERVER['DOCUMENT_ROOT']."index.php");
            die();
        }

    }
    