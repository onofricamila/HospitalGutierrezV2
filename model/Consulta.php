<?php
    require_once './model/Paciente.php';

    class Consulta
    {
        public $idConsulta;
        public $idPaciente;
        public $fecha;
        public $edad;
        public $peso;
        public $vacunas_completas;
        public $vacunas_obs;
        public $maduracion_acorde;
        public $maduracion_obs;
        public $examen_fisico_normal;
        public $examen_fisico_obs;
        public $pc;
        public $ppc;
        public $alimentacion;
        public $obs_grales;
        public $talla;
        public $usuario;

        public static function getConsulta($idConsulta)
        {
            $connection = Connection::getInstance();

            $query = $connection->prepare("SELECT * FROM consulta WHERE idConsulta=?");
            $query->execute(array($idConsulta));

            if ($query->rowCount() == 1) {
                return (new Consulta($query->fetch(PDO::FETCH_ASSOC)));
            }
            return false;
        }

        public function __construct($array)
        {
            $this->baseBuild($array);
        }

        public function baseBuild($array)
        {
            $this ->idConsulta = $array['idConsulta'];
            $this ->idPaciente = $array['idPaciente'];
            $this ->fecha = $array['fecha'];
            $this ->peso = $array['peso'];
            $this ->vacunas_completas = $array['vacunas_completas'];
            $this ->vacunas_obs =  $array['vacunas_obs'];
            $this ->maduracion_acorde = $array['maduracion_acorde'];
            $this ->maduracion_obs = $array['maduracion_obs'];
            $this ->examen_fisico_normal = $array['examen_fisico_normal'];
            $this ->ppc = $array['ppc'];
            $this ->examen_fisico_obs = $array['examen_fisico_obs'];
            $this ->pc = $array['pc'];
            $this ->alimentacion = $array['alimentacion'];
            $this ->obs_grales = $array['obs_grales'];
            $this ->talla = $array['talla'];
            $this ->usuario = $array['usuario'];
            /* calculo edad */
            $paciente = Paciente::getPaciente($this ->idPaciente);
            $this ->edad = $paciente->edad();
        }

        public static function newConsulta($idPaciente, $peso, $vacunas_completas, $vacunas_obs, $maduracion_acorde, $maduracion_obs, $examen_fisico_normal, $examen_fisico_obs, $pc, $ppc, $talla, $alimentacion, $obs_grales, $usuario)
        {
            $connection = Connection::getInstance();

            $query = $connection->prepare("INSERT INTO consulta (idPaciente, peso, vacunas_completas, vacunas_obs, maduracion_acorde, maduracion_obs, examen_fisico_normal, examen_fisico_obs, pc, ppc, alimentacion, obs_grales, talla, usuario)
                                                         VALUES (:idPaciente,:peso, :vacunas_completas, :vacunas_obs, :maduracion_acorde, :maduracion_obs, :examen_fisico_normal, :examen_fisico_obs, :pc, :ppc, :alimentacion, :obs_grales, :talla, :usuario)");

            $query->execute(array('idPaciente' => $idPaciente,
                ':peso' => $peso,
                ':vacunas_completas' => $vacunas_completas,
                ':vacunas_obs' => $vacunas_obs,
                ':maduracion_acorde' => $maduracion_acorde,
                ':maduracion_obs' => $maduracion_obs,
                ':examen_fisico_normal' => $examen_fisico_normal,
                ':examen_fisico_obs' => $examen_fisico_obs,
                ':pc' => $pc,
                ':ppc' => $ppc,
                ':alimentacion' => $alimentacion,
                ':usuario' => $usuario,
                ':obs_grales' => $obs_grales,
                ':talla' => $talla));

            return $query->rowCount() == 1;
        }

        public static function updateConsulta($idConsulta, $peso, $vacunas_completas, $vacunas_obs, $maduracion_acorde, $maduracion_obs, $examen_fisico_normal, $examen_fisico_obs, $pc, $ppc, $talla, $alimentacion, $obs_grales)
        {
            $connection = Connection::getInstance();

            $query = $connection->prepare("UPDATE consulta SET peso=:peso, vacunas_completas=:vacunas_completas, vacunas_obs=:vacunas_obs, maduracion_acorde=:maduracion_acorde, maduracion_obs=:maduracion_obs, examen_fisico_normal=:examen_fisico_normal, examen_fisico_obs=:examen_fisico_obs, pc=:pc, ppc=:ppc, alimentacion=:alimentacion, obs_grales=:obs_grales, talla=:talla WHERE idConsulta=:idConsulta");
            $query->execute(array(':peso' => $peso,
                                    ':vacunas_completas' => $vacunas_completas,
                                    ':idConsulta' => $idConsulta,
                                    ':vacunas_obs' => $vacunas_obs,
                                    ':maduracion_acorde' => $maduracion_acorde,
                                    ':maduracion_obs' => $maduracion_obs,
                                    ':examen_fisico_normal' => $examen_fisico_normal,
                                    ':examen_fisico_obs' => $examen_fisico_obs,
                                    ':pc' => $pc,
                                    ':ppc' => $ppc,
                                    ':alimentacion' => $alimentacion,
                                    ':obs_grales' => $obs_grales,
                                    ':talla' => $talla));
            return $query->rowCount() == 1;
        }

        /* para borrar una consulta en particular */
        public static function deleteConsulta($idConsulta)
        {
            $connection = Connection::getInstance();

            $query = $connection->prepare("DELETE FROM consulta WHERE idConsulta=?");
            $query->execute(array($idConsulta));

            return $query->rowCount() == 1;
        }

        /* para borrar la historia clinica de un paciente */
        public static function deleteHistoria($idPaciente)
        {
            $connection = Connection::getInstance();

            $query = $connection->prepare("DELETE FROM consulta WHERE idPaciente=?");
            $query->execute(array($idPaciente));

            return $query->rowCount() == 1;
        }

        public static function all($idPaciente)
        {
            $query = "SELECT * FROM consulta WHERE idPaciente=? ";
            $query = $query." ORDER BY fecha DESC ";

            $connection = Connection::getInstance();

            $query = $connection->prepare($query);
            $query->execute(array($idPaciente));

            $allConsulta = [];

            if ($query->rowCount() > 0) {
                while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
                    $allConsulta[] = new Consulta($row);
                }
                return $allConsulta;
            }
            return false;
        }
    }
