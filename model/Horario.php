<?php
require_once 'UserBase.php';

class Horario
{
    public $idHorario;
    public $comienzo;

    public static function id($id)
    {
        $connection = Connection::getInstance();

        $query = $connection->prepare("SELECT * FROM horarios WHERE id=?");
        $query->execute(array($id));

        if ($query->rowCount() == 1) {
            $query->setFetchMode(PDO::FETCH_CLASS, 'Horario');
            return ($query->fetch());
        }
        return false;
    }

    public static function all()
    {
        $connection = Connection::getInstance();

        $query = "SELECT * FROM usuario";
        $query = $connection->prepare($query);
        $query->execute();

        $horarios = [];

        if ($query->rowCount() > 0) {
            $query->setFetchMode(PDO::FETCH_CLASS, 'Horario');

            while ($horario = $query->fetch()) {
                $horarios[] = $horario;
            }
            return $horarios;
        }
        return false;
    }
}
