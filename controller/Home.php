<?php
    class HomeController {
        private static $instance;
        
        public static function getInstance() {
            if (!isset(self::$instance)) {
                self::$instance = new self();
            }
    
            return self::$instance;
        }

        private function __construct() {
        }

        public function getContext() {
            $config = ConfigController::getConfiguration();
            $context = [];
            $context['descripcion1'] = $config->descripcion1;
            $context['descripcion2'] = $config->descripcion2;
            $context['descripcion3'] = $config->descripcion3;
            $context['javascripts'] = '/public/js/home.js';
            $context['css'] = '/public/css/main.css';
            return $context;
        }

        public function index(){

            $path = '/home/view.html.twig';
            $context = $this->getContext();
            TwigController::renderTwig($path, $context);
            die;

            /*
            require_once 'view/header.html';
            require_once 'view/navbar.php';
            require_once 'view/home/home.html';
            require_once 'view/footer.html';
            */
        }
    }
