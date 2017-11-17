<?php
$var = file_get_contents('http://localhost/api.php/turnos/16-11-2017');
$decoded = json_decode($var);
var_dump($decoded);
