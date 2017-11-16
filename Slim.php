<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

$app = new \Slim\App;
$app->get('/turnos/{fecha}', function ($request, $response, $args) {
    $pattern = '/(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/';
    $match = preg_match($pattern, $args['fecha']);

    return $response->write(var_dump($args));
});
$app->get('/turnos/{dni}/fecha/{fecha}/hora/{hora}', function ($request, $response, $args) {
    return $response->write(var_dump($args));
});
$app->run();
