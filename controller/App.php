<?php

require_once $_SERVER['DOCUMENT_ROOT'].'/model/User.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/model/UserGuest.php';

class AppController {
    private static $instance;
    private static $user;
    private static $twig;
    
    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public static function getTwig() {
        if (!isset(self::$twig)) {
            $loader = new Twig_Loader_Filesystem('view');
            self::$twig = new Twig_Environment($loader, array());
        }

        return self::$twig;
    }

    public static function renderTwig($path, $context = []) {
        $template = self::getTwig()->loadTemplate($path);
        echo $template->render($context);
    }

    private function __construct() {

    }

    public function addUser() {

    }

    public static function getUser() {
        if (!isset(self::$user)) {
            if (!isset($_SESSION['loggedid'])) {
                require_once $_SERVER['DOCUMENT_ROOT'].'/model/UserGuest.php';
                self::$user = new Guest();
            }
            else {
                require_once $_SERVER['DOCUMENT_ROOT'].'/model/User.php';
                self::$user = User::id($_SESSION['loggedid']);
            }
        }

        return self::$user;
    }

    public function checkPermissions($permission) {
        return self::getUser()->checkPermissions($permission);
    }

    public static function updateLogged() {
        if (!isset($_SESSION['loggedid'])) {
            self::$user = new Guest();
        }
        else {
            self::$user = User::id($_SESSION['loggedid']);
        }
        return self::$user;
    }

    public static function isLogged() {
        return (self::getUser() instanceof User);
    }

    public static function isGuest() {
        return (self::getUser() instanceof Guest);
    }
}

