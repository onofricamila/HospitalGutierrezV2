<?php
class TurnosController
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

    public function getTurnos($fecha)
    {
        $pattern = '/(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/';
        $match = preg_match($pattern, $fecha);

        if (!$match) {
            return $this->badDate('Formato de fecha invalido. Solo se acepta el formato dd-mm-yyyy');
        }

        $fechaTime = strtotime($fecha);
        $todayTime = strtotime(date('d-m-Y'));
        if ($fechaTime < $todayTime) {
            return $this->badDate('La fecha ingresada ya paso.');
        }

        $nowTime = strtotime(date('H:i:s'));
        require_once 'model/Horario.php';
        $lastTurno = Horario::last();
        $lastTurnoTime = strtotime($lastTurno->comienzo);
        if ($fechaTime == $todayTime && $currentTime >= $lastTurnoTime) {
            return $this->badDate('La fecha seleccionada es la de hoy y ya comenzo el ultimo turno del dia.');
        }

        require_once 'model/Turno.php';
        $turnos = Turno::fecha(date('Y-m-d', strtotime($fecha)));
        $horarios = Horario::all();
        $libres = [];

        foreach ($horarios as $horario) {
            if (!isset($turnos[$horario->idHorario]) && ($fechaTime != $todayTime || !$horario->yaPaso())) {
                $libres[] = $horario->comienzo;
            }
        }

        return json_encode($libres);
    }

    public function badDate($msg)
    {
        require_once 'JsonError.php';
        $error = new JsonError('DateError', $msg);
        return json_encode($error);
    }
}
