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
                self::$user = new Guest;
            }
            else {
                require_once '/model/User.php';
                self::$user = User::fromId($id);
            }
        }

        return self::$user;
    }

    public function checkPermissions($permission) {
        // check if session is ok
        return self::getUser().checkPermissions($permission);
    }
}

