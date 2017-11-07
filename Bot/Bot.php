<?php

require_once '/vendor/autoload.php';     // Twig

$botToken = '453768563:AAFJjd8WdUf3fm-SBiIlKpg-HGv0kZdXRmg';
$website = 'https://api.telegram.org/bot'.$botToken;

$update = file_get_contents('php://input');
$update = json_decode($update, true);

$chatId = $update['message']['chat']['id'];
$message = $update['message']['text'];

function sendMessage($chatId, $message)
{
    $url = $GLOBALS[website]."/sendMessage?chat_id=".$chatId."&text=".urlencode($message);
    file_get_contents($url);
}


// instantiate the App object
$app = new \Slim\App();
// Add route callbacks
$app->get('/hi', function ($request, $response, $args) {
    sendMessage($chatId, $message);
});
// Run application
$app->run();
