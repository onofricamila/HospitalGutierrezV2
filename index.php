<?php
    ini_set('display_startup_errors',1);
    ini_set('display_errors',1);
    error_reporting(-1);

    require_once 'connection.php';

    if (isset($_GET['controller']) && isset($_GET['action'])) {
        $controller = strtolower($_GET['controller']);
        $action     = strtolower($_REQUEST['action']);
    } else {
        $controller = 'home';
        $action     = 'index';
    }

    require_once "controller/$controller.php";
    $controller = ucwords($controller) . 'Controller';
    $controller = $controller::getInstance();
    
    call_user_func( array( $controller, $action ) );

