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

        if ($match) {
            $this->badDate();
        }

        require_once 'model/Horario.php';
        require_once 'model/Turno.php';

        $turnos = Turno::fecha($fecha);
        $horarios = Horario::all();
        $libres = [];

        foreach ($horarios as $horario) {
            if (!isset($turnos[$horario->idHorario])) {
                $libres[] = $horario->comienzo;
            }
        }

        return json_encode($libres);
    }

    public function badDate()
    {
        return 'badDate';
    }
}
