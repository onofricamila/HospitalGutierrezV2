<?php
class AppController {
    private static $instance;
    private static $user;

    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct() {

    }

    public function addUser() {

    }

    public static function getUser() {
        if (!isset(self::$user)) {
            session_start();

            if (!isset($_SESSION['logged'])) {
                require_once '/model/Guest.php';
                self::$user = new Guest();
            }
            else {
                require_once '/model/User.php';
                self::$user = User::id($id);
            }
        }

        return self::$user;
    }

    public function checkPermissions($permission) {
        return self::getUser().checkPermissions($permission);
    }
}

