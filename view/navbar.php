<nav>
    <div class="nav-wrapper teal accent-4 ">
        <!-- Btn opciones de side bar -->
        <a href="#" data-activates="slide-out" class="button-collapse">
            <span>
                <span>
                    <i class="fa fa-bars" aria-hidden="true"></i>
                    <strong>Hospital Dr. Ricardo Gutiérrez</strong>
                </span>
            </span>
        </a>
        <div class="false-navbar">
            <!-- Logo -->
            <a href="index.php" target="_self" class="brand-logo hide-on-med-and-down hospital">
                <img class="responsive-img" id="logo" src="/public/imgs/logo3.png" />
                <small>
                    <strong>Hospital Dr. Ricardo Gutiérrez</strong>
                </small>
            </a>
            <!-- Barra principal con links alineados a la izq excepto el logo -->
            <ul class="right hide-on-med-and-down">
                <?php
                    if (AppController::isLogged()) {
                        ?>
                        <li class="">
                            <a href="?controller=login&action=logout" target="_self">Log out</a>
                        </li>
                        <?php
                    }
                    else {
                        ?>
                        <li class="">
                            <a href="?controller=login&action=index" target="_self">Log in</a>
                        </li>
                        <?php
                    }
                ?>
                <li class="">
                    <a href="?controller=Pacientes&action=index" target="_self">Pacientes</a>
                </li>

                <!-- Dropdown Structure -->
                <ul id="dropdown1" class="dropdown-content">
                    <li>
                        <a href="?controller=Users&action=index" target="_self">Usuarios</a>
                    </li>
                    <li>
                        <a href="#!">Roles</a>
                    </li>
                    <li>
                        <a href="#!">Permisos</a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="#!">Configuracion</a>
                    </li>
                </ul>
                <!-- Dropdown Trigger -->
                <li>
                    <a class="dropdown-button" href="#!" data-activates="dropdown1">Administracion &#9660;</a>
                </li>

                <!-- Search -->
                <li>
                    <nav>
                        <div class="nav-wrapper teal">
                            <form>
                                <div class="input-field">
                                    <input id="search" type="search" placeholder="&#xF002; Buscar ..." required style="font-family:Arial, FontAwesome">
                                    <i class="material-icons">close</i>
                                </div>
                            </form>
                        </div>
                    </nav>
                </li>
            </ul>
        </div>
        <!-- Side bar -->
        <ul class="side-nav" id="slide-out">
            <!-- Search -->
            <li>
                <nav>
                    <div class="nav-wrapper teal">
                        <form>
                            <div class="input-field">
                                <input id="search" type="search" placeholder="&#xF002; Buscar ..." required style="font-family:Arial, FontAwesome">
                                <i class="material-icons">close</i>
                            </div>
                        </form>
                    </div>
                </nav>
            </li>
            <!-- Other links -->
            <li>
                <a href="index.php">
                    <span class="fa fa-home" aria-hidden="true"></span> Inicio</a>
            </li>
            <li>
                <a href="?controller=login&action=index">
                    <span class="fa fa-sign-in" aria-hidden="true"></span> Log in</a>
            </li>
            <li>
                <a href="?controller=Pacientes&action=index">
                    <span class="fa fa-users" aria-hidden="true"></span> Pacientes</a>
            </li>
            <!-- Dropdown Structure -->
            <ul id="dropdown2" class="dropdown-content">
                <li>
                    <a href="#!">Usuarios</a>
                </li>
                <li>
                    <a href="#!">Roles</a>
                </li>
                <li>
                    <a href="#!">Permisos</a>
                </li>
                <li class="divider"></li>
                <li>
                    <a href="#!">Configuracion</a>
                </li>
            </ul>
            <!-- Dropdown Trigger -->
            <li>
                <a class="dropdown-button" href="#!" data-activates="dropdown2">
                    <span>&#9660; Administracion</span>
                </a>
            </li>
        </ul>
    </div>
</nav>

<style>
    nav ul a.active {
        color: #00bfa5!important;
    }

    nav .right a:hover {
        background-color: transparent!important;
        border-bottom: 2px solid #00bfa5;
    }

    .false-navbar {
        height: 100%!important;
        background-color: white;
    }

    nav ul a {
        color: #00bfa5!important;
    }

    .hospital {
        color: black!important;
    }

    #logo {
        width: 30px;
        height: 36px;
        margin-bottom: -12px;
        margin-top: -9px;
        margin-left: 5px;
    }

    .logo-collapsed {
        width: 12px;
        height: 12px;
    }

    .brand-logo:hover {
        background: transparent!important;
    }

    .button-collapse {
        color: black;
    }

    .fa-bars {
        color: #00bfa5;
    }

    .side-nav li>a {
        text-align: left;
    }
</style>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="/public/js/materialize.min.js"></script>
<script type="text/javascript" src="/view/navbar.js"></script>