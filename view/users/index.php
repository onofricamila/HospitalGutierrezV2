<section class="container">
    <?php
    foreach ($users as $user) {
        ?>
        <div class="container">
            <p>E-mail: <?php echo $user->email; ?></p>
            <p>Nombre de usuario: <?php echo $user->username; ?></p>
            <p>Es activo?: <?php echo $user->active; ?></p>
            <p>Fecha de actualizacion: <?php echo $user->updated_at; ?></p>
            <p>Fecha de creacion: <?php echo $user->created_at; ?></p>
            <p>Nombre: <?php echo $user->first_name; ?></p>
            <p>Apellido: <?php echo $user->last_name; ?></p>
        </div>
        <?php
    }
    ?>
</section>