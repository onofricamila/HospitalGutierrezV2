<section class="container">
    <?php
    foreach ($users as $user) {
        ?>
        <div class="container">
            <p>E-mail: <?php $user->email ?></p>
            <p>Nombre de usuario: <?php $user->username ?></p>
            <p>Es activo?: <?php $user->active ?></p>
            <p>Fecha de actualizacion: <?php $user->updated_at ?></p>
            <p>Fecha de creacion: <?php $user->created_at ?></p>
            <p>Nombre: <?php $user->first_name ?></p>
            <p>Apellido: <?php $user->last_name ?></p>
        </div>
        <?php
    }
    ?>
</section>