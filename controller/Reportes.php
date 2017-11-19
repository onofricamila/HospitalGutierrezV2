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

            for ($i=0; $i <= 12; $i++) {
                $pcs[$i] = null;
                $pesos[$i] = null;
                $tallas[$i] = null;
            }

            foreach ($consultas as $consulta) {
                if ($consulta->semanas <= 13) {
                    $ok = true;
                    $genero = $consulta->paciente->idGenero;
                    if ($consulta->pc == 0) {
                        $consulta->pc = null;
                    }
                    if ($consulta->peso == 0) {
                        $consulta->peso = null;
                    }
                    if ($consulta->talla == 0) {
                        $consulta->talla = null;
                    } else {
                        $consulta->talla = $consulta->talla * 100;
                    }
                    $pcs[$consulta->semanas - 1] = $consulta->pc;
                    $pesos[$consulta->semanas - 1] = $consulta->peso;
                    $tallas[$consulta->semanas - 1] = $consulta->talla;
                }
            }

            if (!$ok) {
                $this->noConsultas13();
                die;
            }

            $datos = [
                'pc' => $pcs,
                'peso' => $pesos,
                'talla' => $tallas
            ];

            $context = [];
            if ($genero == 1) {
                $context['genero'] = 'Ninas';
            } else {
                $context['genero'] = 'Ninos';
            }

            $path = '/reportes/index.twig';
            /* use el mismo diseño que para mantain*/
            $context['stylesheets'] = ['/public/css/reportes.css'];
            $context['titulo'] = 'Reportes';
            $context['data'] = $datos;

            TwigController::renderTwig($path, $context);
            die;
        }

        public function all()
        {
            AppController::allowed('paciente_index');

            require_once 'model/TipoAgua.php';
            require_once 'model/TipoCalefaccion.php';
            require_once 'model/TipoVivienda.php';
            require_once 'model/Paciente.php';
            $tipoAgua = TipoAgua::all();
            $tipoCale = TipoCalefaccion::all();
            $tipoVivi = TipoVivienda::all();
            $patients = Paciente::all([]);

            $data = [];

            foreach ($tipoAgua as $t) {
                $data['Agua'][$t['id']-1] = [
                    'Cant' => 0,
                    'Nombre' => $t['nombre']
                ];
            }
            foreach ($tipoCale as $t) {
                $data['Cale'][$t['id']-1] = [
                    'Cant' => 0,
                    'Nombre' => $t['nombre']
                ];
            }
            foreach ($tipoVivi as $t) {
                $data['Vivi'][$t['id']-1] = [
                    'Cant' => 0,
                    'Nombre' => $t['nombre']
                ];
            }
            $data['Hela'][0] = [
                'Cant' => 0,
                'Nombre' => 'No'
            ];
            $data['Hela'][1] = [
                'Cant' => 0,
                'Nombre' => 'Si'
            ];
            $data['Elec'][0] = [
                'Cant' => 0,
                'Nombre' => 'No'
            ];
            $data['Elec'][1] = [
                'Cant' => 0,
                'Nombre' => 'Si'
            ];
            $data['Masc'][0] = [
                'Cant' => 0,
                'Nombre' => 'No'
            ];
            $data['Masc'][1] = [
                'Cant' => 0,
                'Nombre' => 'Si'
            ];

            foreach ($patients as $paciente) {
                $data['Agua'][$paciente->idTipoAgua -1]['Cant']++;
                $data['Cale'][$paciente->idTipoCalefaccion -1]['Cant']++;
                $data['Vivi'][$paciente->idTipoVivienda -1]['Cant']++;
                $data['Hela'][$paciente->heladera]['Cant']++;
                $data['Elec'][$paciente->electricidad]['Cant']++;
                $data['Masc'][$paciente->mascota]['Cant']++;
            }

            $path = '/reportes/all.twig';
            /* use el mismo diseño que para mantain*/
            $context['stylesheets'] = ['/public/css/reportesAll.css'];
            $context['titulo'] = 'Reportes';
            $context['data'] = $data;

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
