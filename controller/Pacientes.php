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
            AppController::allowed('paciente_index');
            
            $context = [];
            $nombreTipo = [];
            $allTipoDoc= TipoDoc::all();

            $context['stylesheets'] = ['/public/css/users.css'];
            $context['javascripts'] = ['/public/js/users.js', '/public/js/pacientes.js', '/public/js/validacion.js'];
            $context['pagename'] = 'Pacientes - Index';
            $context['allTipoDoc'] =  $allTipoDoc;
            $context['titulo'] = 'Pacientes';
            $args= [];

            if (isset($_GET['nombre']) && $_GET['nombre'] != "") {
                $args['nombre'] = $_GET['nombre'];
            }
            if (isset($_GET['apellido']) && $_GET['apellido'] != "") {
                $args['apellido'] = $_GET['apellido'];
            }
            if (isset($_GET['dni']) && $_GET['dni'] != "") {
                $args['dni'] = $_GET['dni'];
            }
            
            if (isset($_GET['idTipoDoc'])) {
                $args['idTipoDoc'] = $_GET['idTipoDoc'];
            }
            
           
            if ($allPaciente = Paciente::all($args)) {
               
                $context['noResults'] = false;
                $context['allPaciente'] = $allPaciente;
                $context['pacientesCant'] = count($allPaciente);
                /* permisos para acciones sobre pacientes */
                $context['paciente_update'] = AppController::getInstance()->checkPermissions('paciente_update');
                $context['paciente_show'] = AppController::getInstance()->checkPermissions('paciente_show');
                $context['paciente_destroy'] = AppController::getInstance()->checkPermissions('paciente_destroy');
                $context['paciente_new'] = AppController::getInstance()->checkPermissions('paciente_new');
                /* permisos para acciones sobre la historia clinica de los pacientes */             
                $context['consulta_index'] = AppController::getInstance()->checkPermissions('consulta_index');
                $context['consulta_show'] = AppController::getInstance()->checkPermissions('consulta_show');
                $context['consulta_destroy'] = AppController::getInstance()->checkPermissions('consulta_destroy');
                $context['consulta_new'] = AppController::getInstance()->checkPermissions('consulta_new');
                
            }
            else {
                $context['stylesheets'][] = '/public/css/config-mantenimiento.css';
                $context['noResults'] = true;
            }

            $path = '/pacientes/index.html.twig';
            TwigController::renderTwig($path, $context);
            die;

        }

        public function newPaciente(){
            AppController::allowed('paciente_new');

            $context = [];
            
            $context['stylesheets'] = ['/public/css/pacientes.css'];
            $context['javascripts'] = ['/public/js/pacientes.js','/public/js/validacion.js'];
            $context['pagename'] = 'Pacientes - New';
            $context['allTipoDoc'] = TipoDoc::all();
            $context['allObraSocial'] = ObraSocial::all();
            $context['allTipoVivienda'] = TipoVivienda::all();
            $context['allTipoCalefaccion'] = TipoCalefaccion::all();
            $context['allTipoAgua'] = TipoAgua::all();

            $path = '/pacientes/new.html.twig';
            
            $context['titulo'] = 'Nuevo Paciente';
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
                AppController::req_fields();
                
            }
          
            if(!isset($_POST['idObraSocial'])){
                $idObraSocial = NULL;
            }
            else{
                $idObraSocial = trim($_POST['idObraSocial']);
            }

            if(!isset($_POST['telefono'])){
                $telefono = NULL;
            }
            else{
                $telefono = trim($_POST['telefono']);
            }

            /* por el date picker ...*/
            var_dump($fecha_nacimiento);
            $formato = 'Y-m-d';
            $fecha_nacimiento = DateTime::createFromFormat($formato, $fecha_nacimiento);

            Paciente::newPaciente($apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio, $heladera, $electricidad, $mascota, $idTipoVivienda, $idTipoCalefaccion, $idTipoAgua);
            $this->index();
        }
    
        public function deletePaciente() {
            $idPaciente = $_GET['idPaciente'];
    
            Paciente::deletePaciente($idPaciente);
            $this->index();
        }

        public function showPaciente(){
        
            AppController::allowed('paciente_show');
            $paciente = Paciente::getPaciente($_GET['idPaciente']); 

            $context = [];
            
            $context['stylesheets'] = ['/public/css/pacientes.css'];
            $context['javascripts'] = ['/public/js/pacientes.js'];
            $context['pagename'] = 'Pacientes - Show';
            $context['paciente'] = $paciente;
            $context['genero'] =  new Genero($paciente -> idGenero);
            $context['obra_social'] =  ObraSocial::id($paciente -> idObraSocial);
            $context['tipo_doc'] =  TipoDoc::id($paciente -> idTipoDoc);
            $context['tipo_vivienda'] =  TipoVivienda::id($paciente -> idTipoVivienda);
            $context['tipo_calefaccion'] =  TipoCalefaccion::id($paciente -> idTipoCalefaccion);
            $context['tipo_agua'] = TipoAgua::id($paciente -> idTipoAgua);

            $path = '/pacientes/show.html.twig';
            
            $context['titulo'] = 'Paciente';
            TwigController::renderTwig($path, $context);
            die;
        }

        public function updatePaciente(){
        
            AppController::allowed('paciente_update');

            $context = [];
            
            $context['stylesheets'] = ['/public/css/pacientes.css'];
            $context['javascripts'] = ['/public/js/pacientes.js', '/public/js/validacion.js'];
            $context['pagename'] = 'Pacientes - Update';
            $context['paciente'] =  Paciente::getPaciente($_GET['idPaciente']);
            $context['allTipoDoc'] = TipoDoc::all();
            $context['allObraSocial'] = ObraSocial::all();
            $context['allTipoVivienda'] = TipoVivienda::all();
            $context['allTipoCalefaccion'] = TipoCalefaccion::all();
            $context['allTipoAgua'] = TipoAgua::all();

            $path = '/pacientes/update.html.twig';
            
            $context['titulo'] = 'Actualizar Paciente';
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
                AppController::req_fields();
                
            }

            $idPaciente = $_POST['idPaciente'];
            $telefono = trim($_POST['telefono']);
            if(!isset($_POST['idObraSocial'])){
                $idObraSocial = 3;
            }
            else{
                $idObraSocial = trim($_POST['idObraSocial']);
            }

            Paciente::updatePaciente($idPaciente, $apellido, $nombre, $fecha_nacimiento, $idGenero, $idTipoDoc, $dni, $telefono, $idObraSocial, $domicilio, $heladera, $electricidad, $mascota, $idTipoVivienda, $idTipoCalefaccion, $idTipoAgua);
            $this->index();
        }
    }
?>