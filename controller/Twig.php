<?php
class TwigController{
    private static $twig, $loader;
    
    public static function getInstance() {
        if (!isset(self::$twig)) {
            self::$loader = new Twig_Loader_Filesystem('view');
            self::$twig = new Twig_Environment(self::$loader, array());
        }

        return self::$twig;
    }

    public static function renderTwig($path, $context = []) {
        $config = ConfigController::getConfiguration();

        $context['titulo'] = $config->titulo;
        $context['descripcion1'] = $config->descripcion1;
        $context['descripcion2'] = $config->descripcion2;
        $context['descripcion3'] = $config->descripcion3;
        $context['email'] = $config->email;
        $context['elementos'] = $config->elementos;
        $context['isLogged'] = AppController::isLogged();
        
        $template = self::getInstance()->loadTemplate($path);
        echo $template->render($context);
    }

    private function __construct() {}
        
}
