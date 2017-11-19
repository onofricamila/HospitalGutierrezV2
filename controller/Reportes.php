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

            header('Content-Type: application/json');
            echo json_encode($consultas, JSON_PRETTY_PRINT);
            die;
        }
    }
