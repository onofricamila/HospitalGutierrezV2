<?php
require_once 'UserBase.php';
    
class Guest extends UserBase {

    public function __construct() {
        $this->roles[] = new Rol(4);
    }

    public function isGuest() {
        return true;
    }
}

