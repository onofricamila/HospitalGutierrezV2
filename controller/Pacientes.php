<?php
    class PacientesController {
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
            if (!AppController::getInstance()->checkPermissions('paciente_index')) {
                echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
                die;
            }
            require_once 'view/header.html';
            require_once 'view/navbar.php';
            require_once 'view/pacientes/pacientes.html';
            require_once 'view/footer.html';
        }

        public function newPaciente() {
            if (!AppController::getInstance()->checkPermissions('paciente_new')) {
                echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
                die;
            }
    
            $apellido = $_POST['apellido'];
            $nombre = $_POST['nombre'];
            $fecha_nacimiento = $_POST['fecha_nacimiento'];
            $idGenero = $_POST['idGenero'];
            $tipo_doc = $_POST['tipo_doc'];
            $dni = $_POST['dni'];
            $domicilio = $_POST['domicilio'];
            $telefono = $_POST['telefono'];
            $idObraSocial = $_POST['idObraSocial'];
    
            Paciente::newPaciente($apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio);
            $this->index();
        }
    
        public function deletePaciente() {
            $idPaciente = $_GET['idPaciente'];
    
            Paciente::deletePaciente($idPaciente);
            $this->index();
        }

        public function showPaciente(){
            if (!AppController::getInstance()->checkPermissions('paciente_show')) {
                echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
                die;
            }
            require_once 'view/header.html';
            require_once 'view/navbar.php';
            require_once 'view/pacientes/showPaciente.html';
            require_once 'view/footer.html';
        }

        public function updatePaciente(){
            if (!AppController::getInstance()->checkPermissions('paciente_update')) {
                echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
                die;
            }
            require_once 'view/header.html';
            require_once 'view/navbar.php';
            require_once 'view/pacientes/updatePaciente.html';
            require_once 'view/footer.html';
        }

        public function auxUpdatePaciente() {
            $idPaciente = $_GET['idPaciente'];
            $apellido = $_GET['apellido'];
            $nombre = $_GET['nombre'];
            $fecha_nacimiento = $_GET['fecha_nacimiento'];
            $idGenero = $_GET['idGenero'];
            $tipo_doc = $_GET['tipo_doc'];
            $dni = $_GET['dni'];
            $domicilio = $_GET['domicilio'];
            $telefono = $_GET['telefono'];
            $idObraSocial = $_GET['idObraSocial'];
    
            Paciente::updatePaciente($idPaciente, $apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio);
            $this->index();
        }
    }
?>