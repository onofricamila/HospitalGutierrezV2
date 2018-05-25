<?php
    require_once './controller/Pacientes.php';
    require_once './model/Consulta.php';
    require_once './model/Paciente.php';
    require_once './model/User.php';

    class ConsultasController {
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
            AppController::allowed('consulta_show');
            $idPaciente = $_GET['idPaciente'];
            
            $context = [];

            $context['stylesheets'] = ['/public/css/users.css'];
            $context['javascripts'] = ['/public/js/users.js', '/public/js/consultas.js', '/public/js/validacion.js'];
            $context['pagename'] = 'Consultas - Index';
            $context['titulo'] = 'consultas';            
            $context['usuarios'] = User::all(array());            
            $context['paciente'] = Paciente::getPaciente($idPaciente);
            
            if ($allConsulta = consulta::all($_GET['idPaciente'])) {
               
                $context['noResults'] = false;
                $context['allConsulta'] = $allConsulta;
                $context['consultasCant'] = count($allConsulta);
                /* permisos para acciones sobre consultas */
                $context['consulta_update'] = AppController::getInstance()->checkPermissions('consulta_update');
                $context['consulta_show'] = AppController::getInstance()->checkPermissions('consulta_show');
                $context['consulta_destroy'] = AppController::getInstance()->checkPermissions('consulta_destroy');
                $context['consulta_new'] = AppController::getInstance()->checkPermissions('consulta_new');
               
            }
            else {
                $context['stylesheets'][] = '/public/css/config-mantenimiento.css';
                $context['noResults'] = true;
            }

            $path = '/consultas/index.html.twig';
            TwigController::renderTwig($path, $context);
            die;

        }

        public function newConsulta(){
            AppController::allowed('consulta_new');
            $paciente = Paciente::getPaciente($_GET['idPaciente']);
            $loggedid = $_SESSION['loggedid'];

            $context = [];
            
            $context['stylesheets'] = ['/public/css/pacientes.css'];
            $context['javascripts'] = ['/public/js/consultas.js','/public/js/pacientes.js','/public/js/validacion.js'];
            $context['pagename'] = 'Consultas - New';
            $context['titulo'] = 'Nueva consulta';
            $context['paciente'] = $paciente;
            
            $path = '/consultas/new.html.twig';
            
            TwigController::renderTwig($path, $context);
            die;
        }

        public function auxNewconsulta() { 
            $usuario = AppController::getUser();
            $usuario =$usuario->id;
            $idPaciente = $_POST['idPaciente'];

            if ((!isset($_POST['peso']) || ($peso = trim($_POST['peso'])) == "")
            || (!isset($_POST['vacunas_completas']) || ($vacunas_completas = trim($_POST['vacunas_completas'])) == "")
            || (!isset($_POST['vacunas_obs']) || ($vacunas_obs = trim($_POST['vacunas_obs'])) == "")
            || (!isset($_POST['examen_fisico_normal']) || ($examen_ficico_normal = trim($_POST['examen_fisico_normal'])) == "")
            || (!isset($_POST['examen_fisico_obs']) || ($examen_fisico_obs = trim($_POST['examen_fisico_obs'])) == "")
            || (!isset($_POST['maduracion_acorde']) || ($maduracion_acorde = trim($_POST['maduracion_acorde'])) == "")
            || (!isset($_POST['maduracion_obs']) || ($maduracion_obs = trim($_POST['maduracion_obs'])) == "")
            ){
                AppController::req_fields();
                
            }
           
            if(!isset($_POST['pc'])){
                $pc = NULL;
            }
            else{
                $pc = trim($_POST['pc']);
            }

            if(!isset($_POST['ppc'])){
                $ppc = NULL;
            }
            else{
                $ppc = trim($_POST['ppc']);
            }

            if(!isset($_POST['talla'])){
                $talla = NULL;
            }
            else{
                $talla = trim($_POST['talla']);
            }

            if(!isset($_POST['alimentacion'])){
                $alimentacion = NULL;
            }
            else{
                $alimentacion = trim($_POST['alimentacion']);
            }

            if(!isset($_POST['obs_grales'])){
                $obs_grales = NULL;
            }
            else{
                $obs_grales = trim($_POST['obs_grales']);
            }


            Consulta::newConsulta($idPaciente, $peso, $vacunas_completas, $vacunas_obs, $maduracion_acorde, $maduracion_obs, $examen_ficico_normal, $examen_fisico_obs, $pc, $ppc, $talla, $alimentacion, $obs_grales, $usuario);
            header("Location: index.php?controller=consultas&action=index&idPaciente=$idPaciente"); 
        }
    
        public function deleteConsulta() {
            $idConsulta = $_GET['idConsulta'];
            $consulta = Consulta::getConsulta($idConsulta);
            $idPaciente = $consulta->idPaciente;

            Consulta::deleteConsulta($idConsulta);
            header("Location: index.php?controller=consultas&action=index&idPaciente=$idPaciente"); 
        }

        public function deleteHistoria() {
            $idPaciente = $_GET['idPaciente'];
    
            Consulta::deleteHistoria($idPaciente);
            PacientesController::getInstance()->index();
        }

        public function showConsulta(){
        
            AppController::allowed('consulta_show');
            $consulta = Consulta::getConsulta($_GET['idConsulta']); 
            $paciente = Paciente::getPaciente( $consulta->idPaciente );
            $usuario = User::id( $consulta->usuario );

            $context = [];
            
            $context['stylesheets'] = ['/public/css/pacientes.css'];
            $context['javascripts'] = ['/public/js/consultas.js'];
            $context['pagename'] = 'Consultas - Show';
            $context['consulta'] = $consulta;
            $context['titulo'] = 'Consulta';
            $context['paciente'] = $paciente;
            $context['usuario'] = $usuario;
            
            $path = '/consultas/show.html.twig';
            
            TwigController::renderTwig($path, $context);
            die;
        }

        public function updateConsulta(){
        
            AppController::allowed('consulta_update');
            $consulta = Consulta::getConsulta($_GET['idConsulta']);
            $paciente = Paciente::getPaciente($consulta->idPaciente);

            $context = [];
            
            $context['stylesheets'] = ['/public/css/pacientes.css'];
            $context['javascripts'] = ['/public/js/pacientes.js','/public/js/consultas.js', '/public/js/validacion.js'];
            $context['pagename'] = 'Consultas - Update';
            $context['titulo'] = 'Actualizar consulta';
            $context['consulta'] = $consulta ;
            $context['paciente'] = $paciente ;

            $path = '/consultas/update.html.twig';
            
            TwigController::renderTwig($path, $context);
            die;
        }

        public function auxUpdateconsulta() { 
            $idPaciente = $_POST['idPaciente'];
            $idConsulta = $_POST['idConsulta'];

            if ((!isset($_POST['peso']) || ($peso = trim($_POST['peso'])) == "")
            || (!isset($_POST['vacunas_completas']) || ($vacunas_completas = trim($_POST['vacunas_completas'])) == "")
            || (!isset($_POST['vacunas_obs']) || ($vacunas_obs = trim($_POST['vacunas_obs'])) == "")
            || (!isset($_POST['examen_fisico_normal']) || ($examen_ficico_normal = trim($_POST['examen_fisico_normal'])) == "")
            || (!isset($_POST['examen_fisico_obs']) || ($examen_fisico_obs = trim($_POST['examen_fisico_obs'])) == "")
            || (!isset($_POST['maduracion_acorde']) || ($maduracion_acorde = trim($_POST['maduracion_acorde'])) == "")
            || (!isset($_POST['maduracion_obs']) || ($maduracion_obs = trim($_POST['maduracion_obs'])) == "")
            ){
                AppController::req_fields();
                
            }
           
            if(!isset($_POST['pc'])){
                $pc = NULL;
            }
            else{
                $pc = trim($_POST['pc']);
            }

            if(!isset($_POST['ppc'])){
                $ppc = NULL;
            }
            else{
                $ppc = trim($_POST['ppc']);
            }

            if(!isset($_POST['talla'])){
                $talla = NULL;
            }
            else{
                $talla = trim($_POST['talla']);
            }

            if(!isset($_POST['alimentacion'])){
                $alimentacion = NULL;
            }
            else{
                $alimentacion = trim($_POST['alimentacion']);
            }

            if(!isset($_POST['obs_grales'])){
                $obs_grales = NULL;
            }
            else{
                $obs_grales = trim($_POST['obs_grales']);
            }


            Consulta::updateConsulta($idConsulta, $peso, $vacunas_completas, $vacunas_obs, $maduracion_acorde, $maduracion_obs, $examen_ficico_normal, $examen_fisico_obs, $pc, $ppc, $talla, $alimentacion, $obs_grales);
            header("Location: index.php?controller=consultas&action=index&idPaciente=$idPaciente"); 
        }
    }
?>