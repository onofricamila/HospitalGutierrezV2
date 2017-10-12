<?php
    ini_set('display_startup_errors',1);
    ini_set('display_errors',1);
    error_reporting(-1);

    session_start();

    require_once 'Connection.php';
    require_once 'vendor/autoload.php';
    require_once 'controller/App.php';

    $loader = new Twig_Loader_Filesystem();

    if (isset($_GET['controller']) && isset($_GET['action'])) {
        $controller = ucwords(strtolower($_GET['controller']));
        $action     = strtolower($_GET['action']);
    } else {
        $controller = 'Home';
        $action     = 'index';
    }

    require_once "controller/$controller.php";
    $controller = $controller . 'Controller';  // ucwords transforma primera letra en mayusc
    $controller = $controller::getInstance();
    
    call_user_func( array( $controller, $action ) );

