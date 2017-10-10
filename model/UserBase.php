<?php

class UserBase {
    public $roles;

    public function isGuest() {
        return false;
    }

    private function __construct() {

    }


}