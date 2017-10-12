<section class="container">
    <div class="row">
        <div class="col s12 l6">
            <h3>Usuarios</h3>
        </div>

        <form class="search-form" method="get" target="_self">

        <input type="text" name="controller" value="Users" hidden>
        <input type="text" name="action" value="index" hidden>

        <div class="col s3 l2 height-100">
            <div class="input-field">
                <select name="active">
                    <option value="" disabled selected>Estado</option>
                    <option value="2">Todos</option>
                    <option value="1">Activos</option>
                    <option value="0">Bloqueados</option>
                </select>
                <label>Estado</label>
            </div>
        </div>
            
        <div class="col s8 l3">
            <div class="input-field">
                <input id="search" type="text" name="search">
                <label for="search">Usuario</label>
            </div>
        </div>

        <div class="col s1 l1">
            <button type="submit" class="btn-floating btn-small waves-effect waves-light icon-cyan">
                <i class="material-icons icon-cyan">search</i>
            </button>
        </div>
        
        </form>
    </div>

    <div class="divider divider-margin"></div>

    <div class="row">
    <?php
    $i = 0;
    foreach ($users as $user) {
        $i++;
        ?>
        <div class="col s12 l6">
            <div class="card">
                <div class="card-content black-text">
                    <span class="card-title"><?php echo $user->last_name.", ".$user->first_name; ?>
                        <!-- Dropdown Trigger -->
                        <a href="#!" data-activates="<?php echo "card-dropdown".$i ?>" class="secondary-content dropdown-button float-right"><i class="icon-cyan material-icons">settings</i></a>
                    </span>

                    <div class="divider"></div>

                    <div class="contenido-card">
                        <p style="display: none;"><?php echo $user->id; ?></p>
                        <p>E-mail: <?php echo $user->email; ?></p>
                        <p>Nombre de usuario: <?php echo $user->username; ?></p>
                        <p>Es activo?: <?php if ($user->active) { echo 'Si'; } else { echo 'No'; } ?></p>
                        <p>Fecha de actualizacion: <?php echo $user->updated_at; ?></p>
                        <p>Fecha de creacion: <?php echo $user->created_at; ?></p>
                        <p>Roles: <?php 
                        $userRoles = "";
                        foreach ($user->roles as $rol) {
                            $userRoles = $rol->nombre.", ".$userRoles;
                        }
                        echo substr($userRoles, 0, -2);
                        ?></p>
                        <p style="display: none;"><?php echo $user->first_name; ?></p>
                        <p style="display: none;"><?php echo $user->last_name; ?></p>
                    </div>
                </div>

                <!-- Dropdown Structure -->
                <ul id="<?php echo "card-dropdown".$i ?>" class='dropdown-content'>
                    <li><a href="<?php echo "?controller=Users&action=togglestate&id=".$user->id; ?>" target="_self"><?php if ($user->active) { echo 'Bloquear Usuario'; } else { echo 'Activar Usuario'; } ?></a></li>
                    <li class="divider"></li>
                    <li><a class="modal-trigger deleteModalTrigger" href="#deleteModal">Eliminar Usuario</a></li>
                    <li class="divider"></li>
                    <li><a class="modal-trigger updateModalTrigger" href="#modalNewUser">Actualizar Usuario</a></li>
                    <li class="divider"></li>
                    <li><a class="modal-trigger rolesModalTrigger" href="#rolesModal">Administrar Roles</a></li>
                </ul>
            </div>
        </div>
        <?php
    }
    ?>
    </div>

</section>
<section>
    <!-- Modal newUser -->
    <!-- Modal Trigger -->
    <div class="fixed-action-btn">
        <a class="btn-floating btn-large waves-effect waves-light icon-cyan modal-trigger" href="#modalNewUser">
            <i class="large material-icons">add</i>
        </a>
    </div>

    <!-- Modal Structure -->
    <div id="modalNewUser" class="modal">
        <div class="modal-content">
            <h4 class="center-align" id="title"></h4>
            <div class="divider"></div>
            <div class="row">
                <form class="col s12" method="post" action="index.php?controller=Users&action=newUser" id="form">
                    <div class="row modal-form-row">
                        <div class="input-field col s12">
                            <input id="email" name="email" type="text" class="validate">
                            <label for="email">Email</label>
                        </div>
                    </div>
            
                        <div class="input-field col s12 m6">
                            <input id="user" name="user" type="text" class="validate">
                            <label for="user">Nombre de Usuario</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input id="pass" name="pass" type="password" class="validate">
                            <label for="pass">Contrasena</label>
                        </div>

                        <div class="input-field col s12 m6">
                            <input id="first_name" name="first_name" type="text" class="validate">
                            <label for="first_name">Nombre</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input id="last_name" name="last_name" type="text" class="validate">
                            <label for="last_name">Apellido</label>
                        </div>
                        <input type="text" id="id" name="id" hidden>

                    <div class="row">
                        <div class="center-align">
                            <button class="btn waves-effect waves-light right-align modal-btn" type="reset" name="submit">Limpiar
                                <i class="material-icons right">backspace</i>
                            </button>
                            <button class="btn waves-effect waves-light modal-btn" type="submit" name="submit">Aceptar
                                <i class="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal-footer">
            <button class="modal-action modal-close waves-effect waves-green btn-flat">Volver
                <i class="material-icons right">arrow_back</i>
            </button>
        </div>
    </div>
</section>
<section>
    <!-- Role admin Modal -->
    <div id="rolesModal" class="modal">
    <form method="post" action="index.php?controller=Users&action=updateRol">
        <div class="modal-content">
            <h4 class="center-align">Administrar roles de: <span id="rolesModalUser"></span></h4>
            <div class="divider"></div>

            <div class="row">
                <?php
                foreach ($allRoles as $rol) {
                    ?>
                    <div class="col s12 m6">
                        <p>
                            <input class="roleCheckbox" type="checkbox" id="<?php echo $rol->nombre ?>" name="<?php echo $rol->nombre ?>"/>
                            <label class="roleLabel" for="<?php echo $rol->nombre ?>"><?php echo $rol->nombre ?></label>
                        </p>
                    </div>
                    <?php
                }
                ?>
                <input type="text" id="rolesModalId" name="rolesModalId" hidden>
            </div>
        </div>
        <div class="modal-footer">
            <button class="modal-action modal-close waves-effect waves-green btn-flat">Volver
                <i class="material-icons right">arrow_back</i>
            </button>
            <button class="btn waves-effect waves-light modal-btn" type="submit" name="submit">Aceptar
                <i class="material-icons right">send</i>
            </button>
        </div>
    </form>
    </div>
</section>
<section>
    <!-- Role admin Modal -->
    <div id="deleteModal" class="modal">
    <form method="post" action="index.php?controller=Users&action=deleteUser">
        <div class="modal-content">
            <h4 class="center-align">Esta seguro que quiere eliminar el usuario "<span id="deleteModalUser"></span>"?</h4>
            <div class="divider"></div>

            <div class="row">
                <div class="col s12 m6">
                    <p>Esta accion no se puede revertir.</p>
                </div>
                <input type="text" id="deleteModalId" name="deleteModalId" hidden>
            </div>
        </div>
        <div class="modal-footer">
            <button class="modal-action modal-close waves-effect waves-green btn-flat">Volver
                <i class="material-icons right">arrow_back</i>
            </button>
            <button class="btn waves-effect waves-light modal-btn" type="submit" name="submit">Aceptar
                <i class="material-icons right">send</i>
            </button>
        </div>
    </form>
    </div>
</section>