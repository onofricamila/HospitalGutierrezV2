<?php

class UserBase {
    public $roles;

    public function isGuest() {
        return false;
    }

    private function __construct() {

    }

    public function checkPermissions($permission) {
        foreach ($this->$roles as $rol) {
            if ($rol->checkPermissions($permission)) return true;
        }
        return false;
    }

}