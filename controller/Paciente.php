<?php
    class PacienteController {
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
            require_once 'view/paciente/paciente.html';
            require_once 'view/footer.html';
        }
    }
?>