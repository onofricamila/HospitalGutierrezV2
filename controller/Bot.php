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

        private static function sendMessage($chatId, $message, $reply = "")
        {
            if ($reply != "") {
                $reply = "&reply_to_message_id=".$reply;
            }

            $url = self::website()."/sendMessage?chat_id=".$chatId.$reply."&text=".urlencode($message);
            file_get_contents($url);
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
            switch ($cmd) {
                case '/test':
                    self::sendMessage($chatId, $reply, "test");
                    break;
                case '/hi':
                    self::sendMessage($chatId, $reply, "Hello!");
                    break;
                case '/start':
                    $name = $response['message']['from']['first_name'];
                    $user = $response['message']['from']['username'];
                    $text = 'Hola '.$name." Usuario: ".$user.'!'.PHP_EOL;
                    $text .= '¿Como puedo ayudarte? /help';
                    sendMessage($chatId, $text);
                    break;
                case '/help':
                    $text = 'Los comandos disponibles son estos:' . PHP_EOL;
                    $text .= '/start Inicializa el bot' . PHP_EOL;
                    $text .= '/turnos dd-mm-aaaa Muestra los turnos disponibles del día' . PHP_EOL;
                    $text .= '/reservar dd-mm-aaaa hh:mm Realiza la reserva del turno' . PHP_EOL;
                    $text .= '/help Muestra esta ayuda flaca';
                    sendMessage($chatId, $text);
                    break;
                case '/reservar':
                    $text = 'Te confirmamos el turno para:' . PHP_EOL;
                    $text .= '10:30' . PHP_EOL;
                    sendMessage($chatId, $text);
                    break;
                case '/turnos':
                    $text = 'Los turnos disponibles son: 10:30 | 11:45 | 15:15';
                    sendMessage($chatId, $text);
                    break
                default:
                    $text = 'Lo siento, no es un comando válido.' . PHP_EOL;
                    $text .= 'Prueba /help para ver la lista de comandos disponibles';
                    sendMessage($chatId, $text);
                    break;
            }
        }
    }
