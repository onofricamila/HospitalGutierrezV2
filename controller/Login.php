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
        
        public function index($context = []){
            if (AppController::getUser() instanceof User) {
                echo "Ya estas logueado!";
                die;
            }
            else {
                /*
                require_once 'view/header.html';
                require_once 'view/navbar.php';
                require_once 'view/login/login.html';
                require_once 'view/footer.html';
                die;
                */

                
                $context['stylesheets'] = ['/public/css/login.css'];
                $context['javascripts'] = ['/public/js/login.js'];
                $context['pagename'] = 'Login';
                if (!isset($context['badLogin'])) {
                    $context['badLogin'] = false;
                }
                
                $path = '/login/view.html.twig';
                
                $context['titulo'] = 'Log In';
                TwigController::renderTwig($path, $context);
                die;
            }
        }

        public function login(){
            $user = $_POST['user'];
            $pass = $_POST['pass'];
            $user = User::login($user, $pass);
            if ($user->isGuest()) {
                $this->index(['badLoginText' => 'El usuario o la contrasena no son correctos.',
                                'badLogin' => true]);
                die;
            }
            elseif (!($user->active)) {
                $this->index(['badLoginText' => 'El usuario que intento ingresar no esta activo actualmente.',
                                'badLogin' => true]);
                die;
            }

            $_SESSION['loggedid'] = $user->id;

            header("Location: index.php");
            die();
        }

        public function logout() {
            session_destroy();
            header("Location: index.php");
            die();
        }

    }
    