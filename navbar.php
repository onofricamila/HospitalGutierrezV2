<?php include_once "links.html"?>

<nav>
<div class="nav-wrapper teal accent-4 ">
  <!-- Btn opciones de side bar -->
  <a href="#" data-activates="mobile-demo" class="button-collapse"><span>
        <span>
            <i class="fa fa-bars" aria-hidden="true"></i> <strong>Hospital Dr. Ricardo Gutiérrez</strong></span>
        </span>
  </a>
  <!-- Barra principal con links alineados a la izq excepto el logo -->
  <ul class="tabs left hide-on-med-and-down false-navbar">
    <li><a href="index.php" target="_self" class="brand-logo right hide-on-med-and-down hospital">
        <img class="responsive-img" id="logo" src="imgs/logo3.png"/>
        <small><strong>Hospital Dr. Ricardo Gutiérrez</strong></small>
    </a></li>
    <li class="tab col s3"><a href="login.php" target="_self">Log in</a></li>
    <li class="tab col s3"><a href="badges.html" target="_self">Components</a></li>
    <li class="tab col s3"><a href="collapsible.html" target="_self">Javascript</a></li>
    <li class="tab col s3"><a href="mobile.html" target="_self">Mobile</a></li>
  </ul>
  <!-- Side bar -->
  <ul class="side-nav" id="mobile-demo">
    <li><a href="index.php"><i class="fa fa-home" aria-hidden="true"></i>Inicio</a></li>
    <li><a href="login.php"><i class="fa fa-sign-in" aria-hidden="true"></i>Log in</a></li>
  </ul>
</div>
</nav>

<style>
    .tabs .indicator {
         background-color: #00bfa5!important;
         color: #00bfa5!important;
    }
    .tabs .tab a.active {
        color: #00bfa5!important;
    }

    .tabs .tab a:hover {
        color: #00bfa5!important;
    }

    .tabs .tab a {
        color: #00bfa5!important;
        margin-top: 10px!important;
        
    }
    .false-navbar{
        height: 100%!important;
    }   

    .hospital{
        color: black!important;
    }
    #logo{
        width: 30px;
        height: 36px;
        margin-bottom: -12px;
        margin-top: -9px;
    }
    .logo-collapsed{
        width: 12px;
        height: 12px;
    }
    .brand-logo:hover{
        background: transparent!important;
    }
   
</style>

<?php include_once "scripts.html"?>

<script>
     $( document ).ready(function() {
      $(".button-collapse").sideNav();
      $(".dropdown-button").dropdown();
    });  
</script>

