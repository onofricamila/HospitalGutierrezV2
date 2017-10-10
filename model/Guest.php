<?php
class Guest {
    public $rol;

    public function __construct() {
        $this->$rol = new Rol(4);
    }
}

