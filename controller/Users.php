<?php

class UsersController {
    private static $instance;
    
    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct() {

    }
    
    public function index(){
        
    }

}