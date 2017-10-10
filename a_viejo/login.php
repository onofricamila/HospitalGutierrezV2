<!DOCTYPE html>
<html lang="en">

<head>
    <?php include_once "links.html"?>
    <title>Hospital Gutierrez - Login</title>
</head>

<body class="">
    
    <?php include_once "navbar.php"?>

    <section>
    <div class="centered not-desplazable" style="position: fixed!important; width:  100%; height: 100%;">
        <div class="container" >
            <div class="box centered"  style="margin-top: 60px;margin-bottom: 60px; width: 350px;">
                <div class="container box-title">
                    <h5 class="centered"><strong><small> INICIAR SESIÓN </small></strong></h5>
                </div>
                <div class="">

                    <form action="adm.php" class="form-login" method="post" target="_self" accept-charset="UTF-8" autocomplete="on">
                        <div class="group">
                            <input type="text" placeholder="Nombre" class="input-google" title="Nombre" required>
                            <span class="highlight" title="Nombre"></span>
                        </div>
                        <div class="group">
                            <input type="password" placeholder="Contraseña" class="input-google" title="Contraseña" required>
                            <span class="highlight" title="Contraseña"></span>
                        </div>
                        <br>
                        <input type="submit" class="button buttonBlue" title="Submit">
                        <a href="signup.php">Registrarme</a>
                    </form>

                </div>
            </div>
        </div>
    </div>
    </section>
    <?php include_once "footer.php"?>
</body>

</html>