<br>
<br>
<div class="col s12">
    <div class="row">
        <div class=""> 
            
        </div>
        <br>
        <a href="?controller=Pacientes&action=showPaciente&idPaciente=2">Show patient demo (funciona)</a>
        <br>
        <a href="#modal1" class="modal-trigger">Show bai patient demo (funciona)</a>
        <br>
        <a href="?controller=Pacientes&action=newPaciente">Show new patient demo (funciona)</a>
        <br>
        <a href="?controller=Pacientes&action=updatePaciente&idPaciente=2">Show edit patient demo</a>
        <br>
    

    <table id="tableUserList" class=" highlight responsive bordered">
        <thead>
            <tr>
                <th>Apellido</th>
                <th>Nombre</th>
                <th>Fecha de Nacimiento</th>
                <th>Genero</th>
                <th>Tipo de documento</th>
                <th>DNI</th>
                <th>Domicilio</th>
                <th>Telefono</th>
                <th>Obra Social</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Eclair</td>
                <td>EclairEclairEclairEclairEclai</td>
                <td>Eclair</td>
                <td>EclairEclairEclairEclairEclai</td>
                <td>Eclair</td>
                <td>Eclair</td>
                <td>Eclair</td>
                <td>EclairEclairEclairEclairEclai</td>
                <td>
                    <button class="btn green"><i class="fa fa-edit" aria-hidden="true"></i></button>
                </td>
            </tr>   
            <tr>
                <td>2</td>
                <td>john</td>
                <td>EclairEclairEclairEclairEclai</td>
                <td>Eclair</td>
                <td>EclairEclairEclairEclairEclai</td>
                <td>Eclair</td>
                <td>Eclair</td>
                <td>Eclair</td>
                <td>EclairEclairEclairEclairEclai</td>
                <td>
                    <button class="btn green"><i class="fa fa-edit" aria-hidden="true"></i></button>
                </td>
            </tr>     
        </tbody>
    </table>
</div>
</div>


 <!-- Delete Patient Modal Structure -->
 <div id="modal1" class="modal bottom-sheet">
    <div class="modal-content">
      <h4> <i class=" material-icons">sms_failed</i> ¡Atención! Operación irreversible.</h4>
      <p>Estas a punto de eliminar el paciente de forma permanente. Estas seguro que quieres proseguir?</p>
    </div>
    <div class="modal-footer">
      <a href="?controller=Pacientes&action=deletePaciente&idPaciente= " class="modal-action modal-close waves-effect waves-green btn-flat">Sí, estoy seguro</a>
      <a href="#!" onclick=" $('#modal1').modal('close');" class="modal-action modal-close waves-effect waves-green btn-flat">Cancelar</a>
    </div>
  </div>
    
<script type="text/javascript" src="/public/js/pacientes.js"></script>
