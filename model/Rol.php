<?php
class Rol {
    public $id, $permissions;

    public function __consturct($id) {
        $this
            ->$id = $id
            ->$permissions = [];
        $this->buildPermissions();
    }

    public function buildPermissions() {
        
    }
}

