<?php
    require_once './model/Paciente.php';
    require_once './model/Genero.php';
    require_once './model/ObraSocial.php';
    require_once './model/TipoAgua.php';
    require_once './model/TipoVivienda.php';
    require_once './model/TipoDoc.php';
    require_once './model/TipoCalefaccion.php';

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
            require_once 'view/pacientes/pacientes.php';
            require_once 'view/footer.html'; 

        }

        public function newPaciente(){
            if (!AppController::getInstance()->checkPermissions('paciente_new')) {
                echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
                die;
            }
           /* $allTipoAgua = TipoAgua::all();
            $allTipoCalefaccion = TipoCalefaccion::all();
            $allTipoVivienda = TipoVivienda::all();
            $allObraSocial = ObraSocial::all();
            $allTipoDoc = TipoDoc::all();
            require_once 'view/header.html';
            require_once 'view/navbar.php';
            require_once 'view/pacientes/newPaciente.php';
            require_once 'view/footer.html'; */

            $context = [];
            
            $context['stylesheets'] = ['/public/css/pacientes.css'];
            $context['javascripts'] = ['/public/js/pacientes.js'];
            $context['pagename'] = 'Pacientes - New';
            $context['allTipoDoc'] = TipoDoc::all();
            $context['allObraSocial'] = ObraSocial::all();
            $context['allTipoVivienda'] = TipoVivienda::all();
            $context['allTipoCalefaccion'] = TipoCalefaccion::all();
            $context['allTipoAgua'] = TipoAgua::all();

            $path = '/pacientes/new.html.twig';
            
            TwigController::renderTwig($path, $context);
            die;
        }

        public function auxNewPaciente() {

            if ((!isset($_POST['apellido']) || ($apellido = trim($_POST['apellido'])) == "")
            || (!isset($_POST['nombre']) || ($nombre = trim($_POST['nombre'])) == "")
            || (!isset($_POST['fecha_nacimiento']) || ($fecha_nacimiento = trim($_POST['fecha_nacimiento'])) == "")
            || (!isset($_POST['idGenero']) || ($idGenero = trim($_POST['idGenero'])) == "")
            || (!isset($_POST['idTipoDoc']) || ($idTipoDoc = trim($_POST['idTipoDoc'])) == "")
            || (!isset($_POST['dni']) || ($dni = trim($_POST['dni'])) == "")
            || (!isset($_POST['domicilio']) || ($domicilio = trim($_POST['domicilio'])) == "")
            || (!isset($_POST['heladera']) || ($heladera = trim($_POST['heladera'])) == "")
            || (!isset($_POST['electricidad']) || ($electricidad = trim($_POST['electricidad'])) == "")
            || (!isset($_POST['mascota']) || ($mascota =trim($_POST['mascota'])) == "")
            || (!isset($_POST['idTipoVivienda']) || ($idTipoVivienda =trim($_POST['idTipoVivienda'])) == "")
            || (!isset($_POST['idTipoCalefaccion']) || ($idTipoCalefaccion =trim($_POST['idTipoCalefaccion'])) == "")
            || (!isset($_POST['idTipoAgua'])) || ($idTipoAgua = trim($_POST['idTipoAgua'])) == "")
            {
                echo 'No llenaste los campos obligatorios';
                die;
            }

            $telefono = trim($_POST['telefono']);
            $idObraSocial = trim($_POST['idObraSocial']);

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
            $paciente = Paciente::getPaciente($_GET['idPaciente']); 
            /*
            $genero = new Genero($paciente -> idGenero);
            $obra_social = new ObraSocial($paciente -> idObraSocial);
            $tipo_doc = new TipoDoc($paciente -> idTipoDoc);
            $tipo_vivienda = new TipoVivienda($paciente -> idTipoVivienda);
            $tipo_calefaccion = new TipoCalefaccion($paciente -> idTipoCalefaccion);
            $tipo_agua = new TipoAgua($paciente -> idTipoAgua);

            require_once 'view/header.html';
            require_once 'view/navbar.php';
            require_once 'view/pacientes/showPaciente.php';
            require_once 'view/footer.html'; 
            */

            $context = [];
            
            $context['stylesheets'] = ['/public/css/pacientes.css'];
            $context['javascripts'] = ['/public/js/pacientes.js'];
            $context['pagename'] = 'Pacientes - Show';
            $context['paciente'] = $paciente;
            $context['genero'] =  new Genero($paciente -> idGenero);
            $context['obra_social'] =  new ObraSocial($paciente -> idObraSocial);
            $context['tipo_doc'] =  new TipoDoc($paciente -> idTipoDoc);
            $context['tipo_vivienda'] =  new TipoVivienda($paciente -> idTipoVivienda);
            $context['tipo_calefaccion'] =  new TipoCalefaccion($paciente -> idTipoCalefaccion);
            $context['tipo_agua'] = new TipoAgua($paciente -> idTipoAgua);

            $path = '/pacientes/show.html.twig';
            
            TwigController::renderTwig($path, $context);
            die;
        }

        public function updatePaciente(){
            if (!AppController::getInstance()->checkPermissions('paciente_update')) {
                echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
                die;
            }
           
          /*  $allTipoAgua = TipoAgua::all();
            $allTipoCalefaccion = TipoCalefaccion::all();
            $allTipoVivienda = TipoVivienda::all();
            $allObraSocial = ObraSocial::all();
            $allTipoDoc = TipoDoc::all(); 

            require_once 'view/header.html';
            require_once 'view/navbar.php';
            require_once 'view/pacientes/updatePaciente.php';
            require_once 'view/footer.html'; */

            $context = [];
            
            $context['stylesheets'] = ['/public/css/pacientes.css'];
            $context['javascripts'] = ['/public/js/pacientes.js'];
            $context['pagename'] = 'Pacientes - Update';
            $context['paciente'] =  Paciente::getPaciente($_GET['idPaciente']);
            $context['allTipoDoc'] = TipoDoc::all();
            $context['allObraSocial'] = ObraSocial::all();
            $context['allTipoVivienda'] = TipoVivienda::all();
            $context['allTipoCalefaccion'] = TipoCalefaccion::all();
            $context['allTipoAgua'] = TipoAgua::all();

            $path = '/pacientes/update.html.twig';
            
            TwigController::renderTwig($path, $context);
            die;
        }

        public function auxUpdatePaciente() {
            if ((!isset($_POST['apellido']) || ($apellido = trim($_POST['apellido'])) == "")
            || (!isset($_POST['nombre']) || ($nombre = trim($_POST['nombre'])) == "")
            || (!isset($_POST['fecha_nacimiento']) || ($fecha_nacimiento = trim($_POST['fecha_nacimiento'])) == "")
            || (!isset($_POST['idGenero']) || ($idGenero = trim($_POST['idGenero'])) == "")
            || (!isset($_POST['idTipoDoc']) || ($idTipoDoc = trim($_POST['idTipoDoc'])) == "")
            || (!isset($_POST['dni']) || ($dni = trim($_POST['dni'])) == "")
            || (!isset($_POST['domicilio']) || ($domicilio = trim($_POST['domicilio'])) == "")
            || (!isset($_POST['heladera']) || ($heladera = trim($_POST['heladera'])) == "")
            || (!isset($_POST['electricidad']) || ($electricidad = trim($_POST['electricidad'])) == "")
            || (!isset($_POST['mascota']) || ($mascota =trim($_POST['mascota'])) == "")
            || (!isset($_POST['idTipoVivienda']) || ($idTipoVivienda =trim($_POST['idTipoVivienda'])) == "")
            || (!isset($_POST['idTipoCalefaccion']) || ($idTipoCalefaccion =trim($_POST['idTipoCalefaccion'])) == "")
            || (!isset($_POST['idTipoAgua'])) || ($idTipoAgua = trim($_POST['idTipoAgua'])) == "")
            {
                echo 'No llenaste los campos obligatorios';
                die;
            }

            $idPaciente = $_POST['idPaciente'];
            $telefono = trim($_POST['telefono']);
            $idObraSocial = trim($_POST['idObraSocial']);

            Paciente::updatePaciente($idPaciente, $apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio, $heladera, $electricidad, $mascota, $idTipoVivienda, $idTipoCalefaccion, $idTipoAgua);
            $this->index();
        }
    }
?>