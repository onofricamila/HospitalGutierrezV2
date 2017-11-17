<?php
class Turno
{
    public $idTurno;
    public $idHorario;
    public $fecha;
    public $dni;
    public $comienzo;

    public static function id($id)
    {
        $connection = Connection::getInstance();

        $query = $connection->prepare("SELECT * FROM turnos WHERE idTurno=:id");
        $query->execute([
            ':id' => $id
        ]);

        if ($query->rowCount() == 1) {
            $query->setFetchMode(PDO::FETCH_CLASS, 'Turno');
            return ($query->fetch());
        }
        return false;
    }

    public static function fecha($fecha)
    {
        $connection = Connection::getInstance();

        $query = $connection->prepare("SELECT * FROM turnos WHERE fecha=:fecha");
        $query->execute([
            ':fecha' => $fecha
        ]);

        $turnos = [];

        if ($query->rowCount() > 0) {
            $query->setFetchMode(PDO::FETCH_CLASS, 'Turno');

            while ($turno = $query->fetch()) {
                $turnos[$turno->idHorario] = $turno;
            }
            return $turnos;
        }
        return false;
    }

    public static function horarioFecha($idHorario, $fecha)
    {
        $connection = Connection::getInstance();

        $query = $connection->prepare("SELECT * FROM turnos WHERE idHorario=:horario AND fecha=:fecha");
        $query->execute([
            ':horario' => $idHorario,
            ':fecha' => $fecha
        ]);

        if ($query->rowCount() == 1) {
            $query->setFetchMode(PDO::FETCH_CLASS, 'Turno');
            return ($query->fetch());
        }
        return false;
    }


    public static function all()
    {
        $connection = Connection::getInstance();

        $query = $connection->prepare("SELECT * FROM turnos");
        $query->execute();

        $turnos = [];

        if ($query->rowCount() > 0) {
            $query->setFetchMode(PDO::FETCH_CLASS, 'Turno');

            while ($turno = $query->fetch()) {
                $turnos[$turno->fecha][$turno->idHorario] = $turno;
            }
            return $turnos;
        }
        return false;
    }

    public static function reservar($dni, $idHorario, $fecha)
    {
        $connection = Connection::getInstance();

        $query = $connection->prepare("INSERT INTO `turnos`(`idTurno`, `idHorario`, `fecha`, `dni`) VALUES (NULL, :idHorario, :fecha, :dni)");
        $query->execute([
            ':dni' => $dni,
            ':idHorario' => $idHorario,
            ':fecha' => $fecha
        ]);

        return $query->rowCount() == 1;
    }
}
