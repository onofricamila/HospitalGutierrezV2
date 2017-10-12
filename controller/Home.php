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
            $context['cards'][] = array('title' => 'EL HOSPITAL', 'descripcion' => $config->descripcion1);
            $context['cards'][] = array('title' => 'GUARDIA', 'descripcion' => $config->descripcion2);
            $context['cards'][] = array('title' => 'ESPECIALIDADES', 'descripcion' => $config->descripcion3);
            $context['stylesheets'] = ['/public/css/main.css'];
            $context['javascripts'] = ['/public/js/home.js'];
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
