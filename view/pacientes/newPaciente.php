<div class=" col s8 offset-s2">
        <div class="row">
            <div class="col s8 offset-s2">
                <div class="card hovercard">
                    <div class="card-background">
                        
                    </div>
                    <div class="useravatar">
                        <img alt="" src="../../public/imgs/patient3.png">
                    </div>
                    <div class="card-info"> <span class="card-title">Registra un nuevo paciente!</span> </div>
                </div>
                <div>
                        <ul id="tabs-swipe-demo" class="tabs">
                            <li class="tab col s6"><a class="active" href="#test-swipe-1">Info personal</a></li>
                            <li class="tab col s6"><a href="#test-swipe-2">Datos demograficos</a></li>
                        </ul>
                        <div id="test-swipe-1" class="col s12">
                            <br>
                                <form class="col s12" method="post" action="index.php?controller=Pacientes&action=auxNewPaciente" autocomplete="off">
                                        <div class="input-field col s12 m4">
                                            <input id="nombre" name="nombre" type="text" class="validate">
                                            <label for="nombre">Nombre</label>
                                        </div>
                                        <div class="input-field col s12 m4">
                                            <input id="apellido" name="apellido" type="text" class="validate">
                                            <label for="apellido">Apellido</label>
                                        </div>
                                        
                                        <div class="input-field col s12 m4">
                                            <input id="fecha_nacimiento" name="fecha_nacimiento" type="date" class="validate">
                                        </div>
                                        <div class="input-field col s12 m4">
                                            <select name="genero_form" class="icons">
                                                    <option value="" disabled selected>Genero</option>
                                                    <?php
                                                    foreach ($allGenre as $genre) {
                                                        ?>
                                                        <option data-icon="/publi/imgs/female.png" class="circle" value="<?php echo $genre->idGenero ; ?>"><?php echo $genre->nombre ; ?></option>
                                                        <?php
                                                    }
                                                    ?>
                                            </select>
                                        </div>

                                        <div class="input-field col s12 m4">
                                            <input id="first_name" name="first_name" type="text" class="validate">
                                            <label for="first_name">Tipo de doc</label>
                                        </div>
                                        <div class="input-field col s12 m4">
                                            <input id="dni" name="dni" type="text" class="validate">
                                            <label for="dni">DNI</label>
                                        </div>
                                        <div class="input-field col s12 m4">
                                            <input id="domicilio" name="domicilio" type="text" class="validate">
                                            <label for="domicilio">Domicilio</label>
                                        </div>
                                        <div class="input-field col s12 m4">
                                            <input id="telefono" name="telefono" type="number" class="validate">
                                            <label for="telefono">telefono</label>
                                        </div>
                                        <div class="input-field col s12 m4">
                                            <input id="first_name" name="first_name" type="text" class="validate">
                                            <label for="first_name">Obra social</label>
                                        </div>
                                    
                        </div>
                        <div id="test-swipe-2" class="col s12">
                                <br>
                                        <div class="input-field col s12 m6">
                                            <input id="nombre" name="nombre" type="text" class="validate">
                                            <label for="nombre">Heladera?</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <input id="apellido" name="apellido" type="text" class="validate">
                                            <label for="apellido">Electricidad?</label>
                                        </div>
                                        
                                        <div class="input-field col s12 m6">
                                            <input id="fecha_nacimiento" name="fecha_nacimiento" type="text" class="validate">
                                            <label for="fecha_nacimiento">Mascota?</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <input id="last_name" name="last_name" type="text" class="validate">
                                            <label for="last_name">Tipo vivienda</label>
                                        </div>

                                        <div class="input-field col s12 m6">
                                            <input id="first_name" name="first_name" type="text" class="validate">
                                            <label for="first_name">Tipo calefaccion</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <input id="dni" name="dni" type="text" class="validate">
                                            <label for="dni">Tipo agua</label>
                                        </div>
                                        <div class="row">
                                            <div class="center-align">
                                                <button class="btn waves-effect waves-light right-align" type="reset" name="submit">Limpiar
                                                    <i class="material-icons right">backspace</i>
                                                </button>
                                                <button class="btn waves-effect waves-light" type="submit" name="submit">Enviar
                                                    <i class="material-icons right">send</i>
                                                </button>
                                            </div>
                                        </div>
                                            
                                </form>
                    </div>
                </div>
            </div>
    </div>
</div>           
        <style>
            /* USER PROFILE PAGE */
    #tabs-swipe-demo{
          overflow: hidden!important;
      }
     .card {
        margin-top: 20px;
        padding: 30px;
        background-color: rgba(214, 224, 226, 0.2);
        -webkit-border-top-left-radius:5px;
        -moz-border-top-left-radius:5px;
        border-top-left-radius:5px;
        -webkit-border-top-right-radius:5px;
        -moz-border-top-right-radius:5px;
        border-top-right-radius:5px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .card.hovercard {
        position: relative;
        padding-top: 0;
        overflow: hidden;
        text-align: center;
        background-color: #fff;
        background-color: rgba(255, 255, 255, 1);
    }
    .card.hovercard .card-background {
        height: 130px;
    }
    .card-background img {
        -webkit-filter: blur(25px);
        -moz-filter: blur(25px);
        -o-filter: blur(25px);
        -ms-filter: blur(25px);
        filter: blur(25px);
        margin-left: -100px;
        margin-top: -200px;
        min-width: 130%;
    }
    .card.hovercard .useravatar {
        position: absolute;
        top: 15px;
        left: 0;
        right: 0;
    }
    .card.hovercard .useravatar img {
        width: 100px;
        height: 100px;
        max-width: 100px;
        max-height: 100px;
        border: 5px solid rgba(255, 255, 255, 0.5);
    }
    .card.hovercard .card-info {
        position: absolute;
        bottom: 14px;
        left: 0;
        right: 0;
    }
    .card.hovercard .card-info .card-title {
        padding:0 5px;
        font-size: 20px;
        line-height: 1;
        color: #262626;
        background-color: rgba(255, 255, 255, 0.1);
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
    }
    .card.hovercard .card-info {
        overflow: hidden;
        font-size: 12px;
        line-height: 20px;
        color: #737373;
        text-overflow: ellipsis;
    }
    .card.hovercard .bottom {
        padding: 0 20px;
        margin-bottom: 17px;
    }
    .btn-pref .btn {
        -webkit-border-radius:0 !important;
    }
    
    
        </style>
    
    
    <script type="text/javascript" src="/public/js/pacientes.js"></script>