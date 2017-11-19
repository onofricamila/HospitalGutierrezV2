<?php
    require_once './model/User.php';
    class ReportesController
    {
        private static $instance;

        public static function getInstance()
        {
            if (!isset(self::$instance)) {
                self::$instance = new self();
            }

            return self::$instance;
        }

        private function __construct()
        {
        }

        public function index()
        {
            AppController::allowed('paciente_index');

            if (isset($_GET['idPaciente']) && ($paciente = $_GET['idPaciente']) != "") {
                $paciente = $_GET['idPaciente'];
            } else {
                AppController::req_fields();
                die;
            }

            require_once 'model/Consulta.php';

            $consultas = Consulta::all($paciente);

            $pcs = [];
            $pesos = [];
            $tallas = [];
            $ok = false;

            foreach ($consultas as $consulta) {
                if ($consulta->semanas <= 13) {
                    $ok = true;
                    $genero = $consulta->paciente->idGenero;
                    $pcs[$consulta->semanas] = $consulta->pc;
                    $pesos[$consulta->semanas] = $consulta->peso;
                    $tallas[$consulta->semanas] = $consulta->talla;
                }
            }

            if (!$ok) {
                $this->noConsultas13();
                die;
            }

            $datos = [
                'PCs' => $pcs,
                'Pesos' => $pesos,
                'Tallas' => $tallas
            ];

            $context = [];
            if ($genero == 1) {
                $context['genero'] = 'Ninas';
            } else {
                $context['genero'] = 'Ninos';
            }

            $datajson = json_encode($datos, JSON_PRETTY_PRINT);
            $path = '/reportes/index.twig';
            /* use el mismo diseño que para mantain*/
            $context['stylesheets'] = ['/public/css/reportes.css'];
            $context['titulo'] = 'Reportes';
            $context['data'] = $datajson;

            TwigController::renderTwig($path, $context);
            die;
        }

        public function noConsultas13()
        {
            $context = [];
            $path = '/noWeeks13.twig';
            /* use el mismo diseño que para mantain*/
            $context['stylesheets'] = ['/public/css/noWeeks13.css'];
            $context['titulo'] = 'Paciente invalido';

            TwigController::renderTwig($path, $context);
            die;
        }
    }
