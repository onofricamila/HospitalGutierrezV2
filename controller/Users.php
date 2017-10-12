<?php
require_once './model/User.php';

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
        if (!AppController::getInstance()->checkPermissions('usuario_index')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }

        $args = [];

        if (isset($_GET['active'])) {
            $args['active'] = $_GET['active'];
        }

        if (isset($_GET['search']) && $_GET['search'] != "") {
            $args['search'] = $_GET['search'];
        }

        if ($users = User::all($args)) {

            /*
            require_once 'view/users/header.html';
            require_once 'view/navbar.php';
            require_once 'view/users/index.php';
            require_once 'view/footer.html';
            */

            $context = [];
            
            $context['stylesheets'] = ['/public/css/users.css'];
            $context['javascripts'] = ['/public/js/users.js'];
            $context['pagename'] = 'Usuarios';
            $context['isLogged'] = AppController::isLogged();
            $context['users'] = $users;
            $context['allRoles'] = Rol::all();
            
            $template = AppController::getTwig()->loadTemplate('/users/view.html.twig');
            echo $template->render($context);
            die;
        }
        else {
            echo "Error";
            die;
        }
    }

    public function togglestate() {
        if (!AppController::getInstance()->checkPermissions('usuario_update')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }

        User::id($_GET['id'])->togglestate();
        $this->index();
    }

    public function newUser() {
        if (!AppController::getInstance()->checkPermissions('usuario_new')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }

        if ((!isset($_POST['email']) || ($email = trim($_POST['email'])) == "")
            || (!isset($_POST['user']) || ($user = trim($_POST['user'])) == "")
            || (!isset($_POST['pass']) || ($pass = trim($_POST['pass'])) == "")
            || (!isset($_POST['first_name']) || ($first_name =trim($_POST['first_name'])) == "")
            || (!isset($_POST['last_name'])) || ($last_name = trim($_POST['last_name'])) == "")
        {
            echo 'No llenaste bien los campos';
            die;
        }
        User::newUser($email, $user, $pass, $first_name, $last_name);
        $this->index();
    }

    public function deleteUser() {
        if (!AppController::getInstance()->checkPermissions('usuario_delete')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }

        $id = $_POST['deleteModalId'];

        User::deleteUser($id);
        $this->index();
    }

    public function updateRol() {
        if (!AppController::getInstance()->checkPermissions('usuario_update')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }

        if (!isset($_POST['rolesModalId']) || ($id = trim($_POST['rolesModalId'])) == "") {
            echo 'El campo id no esta cargado.';
            die;
        }

        $roles = Rol::all();
        $user = User::id($id);

        foreach ($roles as $rol) {
            if (isset($_POST[$rol->nombre]) && !$user->hasRol($rol)) {
                $user->addRol($rol->id);
            }
            elseif (!isset($_POST[$rol->nombre]) && $user->hasRol($rol)) {
                $user->deleteRol($rol->id);
            }
        }
        $this->index();
    }

    public function updateUser() {
        if (!AppController::getInstance()->checkPermissions('usuario_update')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }

        if ((!isset($_POST['email']) || ($email = trim($_POST['email'])) == "")
            || (!isset($_POST['user']) || ($username = trim($_POST['user'])) == "")
            || (!isset($_POST['id']) || ($id = trim($_POST['id'])) == "")
            || (!isset($_POST['first_name']) || ($first_name =trim($_POST['first_name'])) == "")
            || (!isset($_POST['last_name'])) || ($last_name = trim($_POST['last_name'])) == "")
        {
            echo 'No llenaste bien los campos';
            die;
        }

        $user = User::id($id);

        $user->updateUser($email, $username, $first_name, $last_name);

        if (isset($_POST['pass']) && ($pass = trim($_POST['pass'])) != "") {
            $user->updatePass($pass);
        }

        $this->index();
    }

}