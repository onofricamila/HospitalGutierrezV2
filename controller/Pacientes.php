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

        public function newPaciente(){
            if (!AppController::getInstance()->checkPermissions('paciente_new')) {
                echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
                die;
            }
            require_once 'view/header.html';
            require_once 'view/navbar.php';
            require_once 'view/pacientes/newPaciente.html';
            require_once 'view/footer.html';
        }

        public function auxNewPaciente() {
            if (!AppController::getInstance()->checkPermissions('paciente_new')) {
                echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
                die;
            }
            if ((!isset($_POST['email']) || ($email = trim($_POST['email'])) == "")
            || (!isset($_POST['user']) || ($user = trim($_POST['user'])) == "")
            || (!isset($_POST['pass']) || ($pass = trim($_POST['pass'])) == "")
            || (!isset($_POST['first_name']) || ($first_name =trim($_POST['first_name'])) == "")
            || (!isset($_POST['last_name'])) || ($last_name = trim($_POST['last_name'])) == "")
        {
            echo 'No llenaste bien los campos';
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
            $heladera = $_POST['heladera'];
            $electricidad = $_POST['electricidad'];
            $mascota = $_POST['mascota'];
            $idTipoVivienda = $_POST['idTipoVivienda'];
            $idTipoCalefaccion = $_POST['idTipoCalefaccion'];
            $idTipoAgua = $_POST['idTipoAgua'];
    
            Paciente::newPaciente($apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio, $heladera, $electricidad, $mascota, $idTipoVivienda, $idTipoCalefaccion, $idTipoAgua);
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
            $heladera = $_GET['heladera'];
            $electricidad = $_GET['electricidad'];
            $mascota = $_GET['mascota'];
            $idTipoVivienda = $_GET['idTipoVivienda'];
            $idTipoCalefaccion = $_GET['idTipoCalefaccion'];
            $idTipoAgua = $_GET['idTipoAgua'];
    
            Paciente::updatePaciente($idPaciente, $apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio, $heladera, $electricidad, $mascota, $idTipoVivienda, $idTipoCalefaccion, $idTipoAgua);
            $this->index();
        }
    }
?>