<section class="container">
    <div class="row">
        <h3 class="center-align">Listado de Usuarios</h2>
        <div class="divider"></div>
    </div>
    <div class="row">
    <?php
    $i = 0;
    foreach ($users as $user) {
        $i++;
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

                <!-- Dropdown Trigger -->
                <a class='dropdown-button btn' href='#' data-activates='dropdown1'>Acciones</a>

                <!-- Dropdown Structure -->
                <ul id="<?php echo "dropdown".$i ?>" class='dropdown-content'>
                    <li><a href="<?php echo "?controller=Users&action=togglestate&id=".$user->id; ?>" target="_self"><?php if ($user->active) { echo 'Bloquear Usuario'; } else { echo 'Activar Usuario'; } ?></a></li>
                    <li class="divider"></li>
                    <li><a href="<?php echo "?controller=Users&action=deleteUser&id=".$user->id; ?>" target="_self">Eliminar Usuario</a></li>
                    <li class="divider"></li>
                    <li><a href="<?php echo "?controller=Users&action=updateUser&id=".$user->id; ?>" target="_self">Actualizar Usuario</a></li>
                    <li class="divider"></li>
                    <li><a href="<?php echo "?controller=Users&action=showUser&id=".$user->id; ?>" target="_self">Ver Usuario</a></li>
                    <li class="divider"></li>
                    <li><a href="<?php echo "?controller=Users&action=adminRoles&id=".$user->id; ?>" target="_self">Administrar Roles</a></li>
                </ul>
            </div>
        </div>
        <?php
    }
    ?>
    </div>
</section>