<?php include_once "links.html"?>

<nav class="nav-extended">
    <div class="nav-wrapper teal accent-4 ">
      <a href="index.php" class="brand-logo"><img class="responsive-img" id="logo" src="imgs/logo3.png"/><span><small><strong>Hospital Dr. Ricardo Gutiérrez</strong></small></span></a>
      <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </ul>
      <ul class="side-nav" id="mobile-demo">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </ul>
    </div>
    <div class="nav-content white">
      <ul class="tabs tabs-transparent">
        <li class="tab"><a href="www.google.com">Test 1</a></li>
        <li class="tab"><a class="active" href="www.google.com">Test 2</a></li>
        <li class="tab disabled"><a href="www.google.com">Disabled Tab</a></li>
        <li class="tab"><a href="www.google.com">Test 4</a></li>
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
    }
     
    #logo{
        width: 30px;
        height: 36px;
        margin-bottom: -12px;
        margin-top: -9px;
        margin-right: 12px;
    }
 </style>

<?php include_once "scripts.html"?>

<script>
     $( document ).ready(function() {
      $(".button-collapse").sideNav();
    });  
</script>
