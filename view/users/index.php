<section class="container">
    <div class="row">
        <div class="col m12 l6">
            <h3>Usuarios</h3>
        </div>
        <form class="search-form">

        <div class="col m12 l2" style="height: 100%;">
            <div class="input-field">
                <select>
                    <option value="0" selected>Estado</option>
                    <option value="1">Todos</option>
                    <option value="2">Activos</option>
                    <option value="3">Bloqueados</option>
                </select>
            </div>
        </div>
            
        <div class="col m12 l4">
            <div class="input-field">
                <input id="search" type="text">
                <label for="search">Nombre</label>
            </div>
        </div>

        </form>
    </div>

    <div class="divider"></div>

    <div class="row">
    <?php
    $i = 0;
    foreach ($users as $user) {
        $i++;
        ?>
        <div class="col m12 l6">
            <div class="card">
                <div class="card-content black-text">
                    <span class="card-title"><?php echo $user->last_name.", ".$user->first_name; ?>
                        <!-- Dropdown Trigger -->
                        <a href="#!" data-activates="<?php echo "card-dropdown".$i ?>" class="secondary-content dropdown-button float-right"><i class="icon-cyan material-icons">settings</i></a>
                    </span>
                    <p>E-mail: <?php echo $user->email; ?></p>
                    <p>Nombre de usuario: <?php echo $user->username; ?></p>
                    <p>Es activo?: <?php if ($user->active) { echo 'Si'; } else { echo 'No'; } ?></p>
                    <p>Fecha de actualizacion: <?php echo $user->updated_at; ?></p>
                    <p>Fecha de creacion: <?php echo $user->created_at; ?></p>
                </div>

                <!-- Dropdown Structure -->
                <ul id="<?php echo "card-dropdown".$i ?>" class='dropdown-content'>
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