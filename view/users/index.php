<section class="container">
    <div class="row">
        <h3>Listado de Usuarios</h2>
        <div class="divider"></div>
    </div>
    <div class="row">
    <?php
    foreach ($users as $user) {
        ?>
        <div class="col m12 l6">
            <div class="card">
                <div class="card-content black-text">
                    <span class="card-title"><?php echo $user->last_name.", ".$user->first_name; ?></span>
                    <p>E-mail: <?php echo $user->email; ?></p>
                    <p>Nombre de usuario: <?php echo $user->username; ?></p>
                    <p>Es activo?: <?php if ($user->active) { echo 'Si'; } else { echo 'No'; } ?></p>
                    <p>Fecha de actualizacion: <?php echo $user->updated_at; ?></p>
                    <p>Fecha de creacion: <?php echo $user->created_at; ?></p>
                </div>
                <div class="card-action">
                    <a href="<?php echo "?controller=Users&action=togglestate&id=".$user->id; ?>" target="_self"><?php if ($user->active) { echo 'Bloquear'; } else { echo 'Activar'; } ?></a>
                    <a href="">Administrar roles</a>
                </div>
            </div>
        </div>
        <?php
    }
    ?>
    </div>
</section>