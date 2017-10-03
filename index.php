<!DOCTYPE html>
<html lang="en">

<head>
    <?php include_once "links.html"?>
    <title>Hospital Gutierrez - Index</title>
</head>

<body>
    
    <?php include_once "navbar.php"?>

    <header>
        <div class="img-div-inicio">
            <div class="carousel carousel-slider">
                <a class="carousel-item" href="#one!"><img src="imgs/c1.jpeg"></a>
                <a class="carousel-item" href="#two!"><img src="imgs/c2.jpeg"></a>
                <a class="carousel-item" href="#two!"><img src="imgs/c3.jpeg"></a>
                <a class="carousel-item" href="#two!"><img src="imgs/c4.jpg"></a>
                <a class="carousel-item" href="#two!"><img src="imgs/c5.jpeg"></a>
                <a class="carousel-item" href="#two!"><img src="imgs/c6.jpeg"></a>
            </div>
        </div>
    </header>

    <section>
        <div>
            <div class="containerInicio">
                <div class="row">
                    <div class="one-third-container">
                        <div class="card">
                            <h4 class="card-header"><small> EL HOSPITAL </small></h4>
                            <div class="card-body">
                                <p class="card-text">Este centro de salud tiene un programa de residencias de primer nivel en el país. Se ofrecen
                                    oportunidades de práctica intensiva y supervisada en ámbitos profesionales y por la misma
                                    -por supuesto- se recibe un salario mensual, acorde a lo que la regulación médica profesional
                                    lo indica en cada momento</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="btn btn-masinfo">Mas info >></a>
                            </div>
                        </div>
                    </div>
                    <div class="one-third-container">
                        <div class="card">
                            <h4 class="card-header"><small> GUARDIA </small></h4>
                            <div class="card-body">
                                <p class="card-text">Hospital Dr. Ricardo Gutierrez de La Plata dispone de un sofisticado servicio de guardias
                                    médicas las 24 horas para la atención de distintas urgencias. La administración de la
                                    institución hace viable una eficiente separación de los pacientes según el nivel de seriedad
                                    y tipo de patología.
                                </p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="btn btn-masinfo">Mas info >></a>
                            </div>
                        </div>
                    </div>
                    <div class="one-third-container">
                        <div class="card">
                            <h4 class="card-header"><small> ESPECIALIDADES </small></h4>
                            <div class="card-body">
                                <p class="card-text">Acorde a una respetable trayectoria en materia de medicina y salud, en Hospital Dr. Ricardo
                                    Gutierrez de La Plata podemos encontrar profesionales de las principales especialidades
                                    de salud. Del mismo modo se brinda atención programada y de urgencias, se realizan estudios
                                    médicos y se brinda soporte en muchas de las ramas comunes de la medicina moderna.</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="btn btn-masinfo">Mas info >></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php include_once "footer.php"?>

    <script>
        $(document).ready(function(){
            $('.carousel').carousel();
        });
        
         $('.carousel.carousel-slider').carousel({fullWidth: true});

         $('.carousel').carousel();
        setInterval(function() {
            $('.carousel').carousel('next');
        }, 4500); // every x seconds
    </script>
</body>

</html>