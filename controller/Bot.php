<?php
    class BotController
    {
        private static $instance;

        public static function getInstance()
        {
            if (!isset(self::$instance)) {
                self::$instance = new self();
                self::$commands = [];
            }

            return self::$instance;
        }

        public static function request()
        {
            $returnArray = true;
            $rawData = file_get_contents('php://input');
            $response = json_decode($rawData, $returnArray);
            $chatId = $response['message']['chat']['id'];
            $reply = $response['message']['message_id'];



            // Obtener comando (y sus posibles parametros)
            $regExp = '#^(\/[a-zA-Z0-9\/]+?)(\ .*?)$#i';
            $tmp = preg_match($regExp, $response['message']['text'], $aResults);

            if (isset($aResults[1])) {
                $cmd = trim($aResults[1]);
                $params = trim($aResults[2]);
            } else {
                $cmd = trim($response['message']['text']);
                $params = '';
            }

            self::dispatcher($chatId, $cmd, $params, $response);
        }

        private static function sendMessage($chatId, $msg)
        {
            $url = 'https://api.telegram.org/bot453768563:AAFJjd8WdUf3fm-SBiIlKpg-HGv0kZdXRmg/sendMessage';
            $options = array(
                'http' => array(
                    'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                    'method' => 'POST',
                    'content' => http_build_query($msg)
                )
            );
            $context = stream_context_create($options);
            $result = file_get_contents($url, false, $context);
            exit(0);
        }

        private static function token()
        {
            return '453768563:AAFJjd8WdUf3fm-SBiIlKpg-HGv0kZdXRmg';
        }

        private static function website()
        {
            return 'https://api.telegram.org/bot'.self::token();
        }

        public static function dispatcher($chatId, $cmd, $params, $response)
        {
            $msg = array();
            $msg['chat_id'] = $chatId;
            $msg['text'] = null;
            $msg['disable_web_page_preview'] = true;
            $msg['reply_markup'] = null;

            switch ($cmd) {
                case '/start':
                    $name = $response['message']['from']['first_name'];
                    $user = $response['message']['from']['username'];
                    $msg['text'] = 'Hola '.$name." Usuario: ".$user.'!'.PHP_EOL;
                    $msg['text'] .= '¿Como puedo ayudarte? /help';
                    self::sendMessage($chatId, $msg);
                    break;
                case '/help':
                    $msg['text'] = 'Los comandos disponibles son estos:'.PHP_EOL;
                    $msg['text'] .= '/start Inicializa el bot'.PHP_EOL;
                    $msg['text'] .= '/turnos dd-mm-aaaa Muestra los turnos disponibles del día'.PHP_EOL;
                    $msg['text'] .= '/reservar dd-mm-aaaa hh:mm Realiza la reserva del turno'.PHP_EOL;
                    $msg['text'] .= '/help Muestra esta ayuda flaca';
                    self::sendMessage($chatId, $msg);
                    break;
                case '/reservar':
                    $msg['text'] = 'Te confirmamos el turno para:'.PHP_EOL;
                    $msg['text'] .= '10:30'.PHP_EOL;
                    self::sendMessage($chatId, $msg);
                    break;
                case '/turnos':
                    $msg['text'] = 'Los turnos disponibles son: 10:30 | 11:45 | 15:15';
                    self::sendMessage($chatId, $msg);
                    break
                default:
                    $msg['text'] = 'Lo siento, no es un comando válido.'.PHP_EOL;
                    $msg['text'] .= 'Prueba /help para ver la lista de comandos disponibles';
                    $msg['reply_to_message_id'] = $response['message']['message_id'];
                    self::sendMessage($chatId, $msg);
                    break;
            }
        }
    }