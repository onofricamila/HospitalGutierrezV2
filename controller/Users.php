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
   
        AppController::allowed('usuario_index');  

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
            $context['users'] = $users;
            $context['allRoles'] = Rol::all();
            $context['usersCant'] = count($users);

            $path = '/users/view.html.twig';
            
            TwigController::renderTwig($path, $context);
            die;
        }
        else {
            echo "Error";
            die;
        }
    }

    public function togglestate() {

        AppController::allowed('usuario_update');  

        User::id($_GET['id'])->togglestate();
        if ($_GET['id'] == AppController::getUser()->id) {
            require_once "controller/Login.php";
            LoginController::getInstance()->logout();
        }
        $this->index();
    }

    public function newUser() {

        AppController::allowed('usuario_new');  
        
        if ((!isset($_POST['email']) || ($email = trim($_POST['email'])) == "" || !filter_var($email, FILTER_VALIDATE_EMAIL))
            || (!isset($_POST['user']) || ($user = trim($_POST['user'])) == "" || strlen($user) < 4)
            || (!isset($_POST['pass']) || ($pass = trim($_POST['pass'])) == "" || strlen($pass) < 4)
            || (!isset($_POST['first_name']) || ($first_name =trim($_POST['first_name'])) == "" || !preg_match("/^[a-zA-Z ]*$/",$first_name) )
            || (!isset($_POST['last_name'])) || ($last_name = trim($_POST['last_name'])) == "" || !preg_match("/^[a-zA-Z ]*$/",$last_name) )
        {
            echo 'No llenaste bien los campos';
            die;
        }

        User::newUser($email, $user, $pass, $first_name, $last_name);
        $this->index();
    }

    public function deleteuser() {

        AppController::allowed('usuario_delete');  
        $id = $_POST['deleteModalId'];
        var_dump($id);
        die;
        if (!is_int($id)) {
            $this->index();
        }
        User::deleteUser($id);
        $this->index();
    }

    public function updateRol() {

        AppController::allowed('usuario_update');  

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
       
        AppController::allowed('usuario_update');  

        if ((!isset($_POST['email']) || ($email = trim($_POST['email'])) == "" || !filter_var($email, FILTER_VALIDATE_EMAIL))
            || (!isset($_POST['user']) || ($username = trim($_POST['user'])) == "" || strlen($username) < 4)
            || (!isset($_POST['id']) || ($id = trim($_POST['id'])) == "")
            || (!isset($_POST['pass']) || ($pass = trim($_POST['pass'])) == "" || strlen($pass) < 4)
            || (!isset($_POST['first_name']) || ($first_name =trim($_POST['first_name'])) == "" || !preg_match("/^[a-zA-Z ]*$/",$first_name) )
            || (!isset($_POST['last_name'])) || ($last_name = trim($_POST['last_name'])) == "" || !preg_match("/^[a-zA-Z ]*$/",$last_name) )
        {
        echo 'No llenaste bien los campos';
            die;
        }

        $user = User::id($id);

        $user->updateUser($email, $username, $first_name, $last_name, $pass);

        $this->index();
    }

}