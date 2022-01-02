document.getElementById("formulario").addEventListener("submit",crear);

function crear(e){
codigo = document.getElementById("CodigoAl").value;
nombre = document.getElementById("Alumno").value;
grado = document.getElementById("Grado").value;
grupo = document.getElementById("Grupo").value;

let alumno = {
codigo,
nombre,
grado,
grupo
}

if(localStorage.getItem("Datos") === null){
  let alumnos = [];
  alumnos.push(alumno);
  localStorage.setItem("Datos", JSON.stringify(alumnos));
}else{
   let alumnos = JSON.parse(localStorage.getItem("Datos"));
   alumnos.push(alumno);
   localStorage.setItem("Datos",JSON.stringify(alumnos));
}
leer();
document.getElementById("formulario").reset();
alert("Alumno ingresado correctamente");
e.preventDefault();
}

function leer(){
    let alumnos = JSON.parse(localStorage.getItem("Datos"));
    document.getElementById("tbody").innerHTML = ""
    for(let i=0; i < alumnos.length; i++){
       let codigo = alumnos[i].codigo
       let nombre = alumnos[i].nombre
       let grado = alumnos[i].grado
       let grupo = alumnos[i].grupo

       document.getElementById("tbody").innerHTML +=
      `<tr>
            <td>${codigo}</td>
            <td>${nombre}</td>
            <td>${grado}</td>
            <td>${grupo}</td>
            <td> <button class="eliminar" onClick ="eliminar('${codigo}')"> Eliminar </button> </td>
            <td> <button class="editar" onClick ="editar('${codigo}')"> Editar </button> </td>
       </tr>`
    }
}

function editar(codigo){
let alumnos =JSON.parse(localStorage.getItem("Datos"));
for (let i=0; i < alumnos.length; i++){
    if(alumnos[i].codigo === codigo){
        document.getElementById("contenedor").innerHTML =
        `<tr>
        <td>
            <div>
                <h2> Editar alumno </h2>
              </div>
            <form id="formulario" autocomplete="off">
                <div>
                    <label for="CodigoAl"> Código </label>
                    <input type="text" name="CodigoAl" required="" pattern="[0-9]+" id="newCodigoAl" placeholder="${alumnos[i].codigo}">
                </div>
                <div>
                    <label for="Alumno"> Nombre del Alumno </label>
                    <input type="text" name="Alumno" required="" pattern="[a-z A-Z]+"  id="newAlumno" placeholder="${alumnos[i].nombre}">
                </div>
                <div>
                    <label for="Grado"> Grado </label>
                    <input minlength="3" maxlength="3" type="text" name="Grado" required="" id="newGrado" placeholder="${alumnos[i].grado}">
                </div>
                <div>
                    <label for="Grupo"> Grupo </label>
                    <input minlength="3" maxlength="3" type="text" name="Grupo" required="" id="newGrupo" placeholder="${alumnos[i].grupo}">
                </div>
                
            </form>
            <button class="actualizar" type="submit" onClick ="actualizar('${i}')"> Actualizar </button>
            <button class="cancelar" type="submit" onClick ="Vista()"> Cancelar </button>


            <td>
                <table class="lista" id="Encabezados">
                    <thead>
                        <tr>
                            <th> Código </th>
                            <th> Nombre del Alumno </th>
                            <th> Grado </th>
                            <th> Grupo </th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        
                    </tbody>
                </table>
            </td>
    
        </td>
    </tr>`
    }
}
}

function actualizar(i){
  let alumnos = JSON.parse(localStorage.getItem("Datos"));
  alumnos[i].codigo = document.getElementById("newCodigoAl").value;
  alumnos[i].nombre = document.getElementById("newAlumno").value;
  alumnos[i].grado = document.getElementById("newGrado").value;
  alumnos[i].grupo = document.getElementById("newGrupo").value;
  if(alumnos[i].codigo ==""){
      alert("Ingrese un código de alumno antes de actualizar");
  }else{
    if(alumnos[i].nombre ==""){
      alert("Ingrese el nombre del alumno antes de actualizar");
    }else{
        if(alumnos[i].grado ==""){
            alert("Ingrese el grado del alumno antes de actualizar");
        }else{
            if(alumnos[i].grupo ==""){
                alert("Ingrese el grupo del alumno antes de actualizar");
            }else{
            localStorage.setItem("Datos",JSON.stringify(alumnos));
            Vista();
            }
            
        }
        
    }

  }
  localStorage.setItem("Datos", JSON.stringify(alumnos));
  Vista();

}

function eliminar(codigo){
  let alumnos = JSON.parse(localStorage.getItem("Datos"));
  for(let i=0; i<alumnos.length; i++){
      if(alumnos[i].codigo === codigo){
         alumnos.splice(i,1);
      }
  }
  localStorage.setItem("Datos", JSON.stringify(alumnos));
  leer();
}

function Vista(){
    document.getElementById("contenedor").innerHTML = 
    `<tr>
    <td>
        <div>
            <h2> Agregar alumno </h2>
          </div>
        <form id="formulario" autocomplete="off">
            <div>
                <label for="CodigoAl"> Código </label>
                <input type="text" name="CodigoAl" required="" pattern="[0-9]+" id="CodigoAl" placeholder="Agregue solo números">
            </div>
            <div>
                <label for="Alumno"> Nombre del Alumno </label>
                <input type="text" name="Alumno" required="" pattern="[a-z A-Z]+"  id="Alumno" placeholder="Agregue solo letras">
            </div>
            <div>
                <label for="Grado"> Grado </label>
                <input minlength="3" maxlength="3" type="text" name="Grado" required="" id="Grado" placeholder="Se admiten números y letras, formato: 5to">
            </div>
            <div>
                <label for="Grupo"> Grupo </label>
                <input minlength="3" maxlength="3" type="text" name="Grupo" required="" id="Grupo" placeholder="Se admiten números y letras, formato: Ms5">
            </div>
            <div class="Botones">
                <input type="submit" value="Agregar" id="agregar">
                <input type="reset" value="Limpiar" id="limpiar">
            </div>
        </form>
        <td>
            <table class="lista" id="Encabezados">
                <thead>
                    <tr>
                        <th> Código </th>
                        <th> Nombre del Alumno </th>
                        <th> Grado </th>
                        <th> Grupo </th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    
                </tbody>
            </table>
        </td>

    </td>
</tr>`
leer();
}

leer();

function limpiar(){
    document.getElementById('CodigoAl').value = '';
    document.getElementById('Alumno').value = '';
    document.getElementById('Grado').value = '';
    document.getElementById('Grupo').value = '';
}


/*var selectedRow = null;
function onFormSubmit(){
event.preventDefault();
var Datos = LeerInfo();
if(selectedRow == null){
    Insertar(Datos);
}else{
Actualizar(Datos);

}   
limpiar();
}

function LeerInfo(){
    var Datos= {};
    Datos["CodigoAl"] = document.getElementById("CodigoAl").value;
    Datos["Alumno"] = document.getElementById("Alumno").value;
    Datos["Grado"] = document.getElementById("Grado").value;
    Datos["Grupo"] = document.getElementById("Grupo").value;
    return Datos;

}

function Insertar(data){
    var table = document.getElementById('Encabezados').getElementsByTagName('tbody')[0];
    var nuevaFila = table.insertRow(table.length);
    var celda1 = nuevaFila.insertCell(0);
    celda1.innerHTML = data.CodigoAl;
    var celda2 = nuevaFila.insertCell(1);
    celda2.innerHTML = data.Alumno;
    var celda3 = nuevaFila.insertCell(2);
    celda3.innerHTML = data.Grado;
    var celda4 = nuevaFila.insertCell(3);
    celda4.innerHTML = data.Grupo;
    var celda5 = nuevaFila.insertCell(4);
    celda5.innerHTML = `<button onClick='Editar(this)' class="modificar"> Modificar </button> <button onClick='Eliminar(this)' class="eliminar"> Eliminar </button>`
}

function Editar(td){
   selectedRow = td.parentElement.parentElement;
   document.getElementById('CodigoAl').value = selectedRow.cells[0].innerHTML;
   document.getElementById('Alumno').value = selectedRow.cells[1].innerHTML;
   document.getElementById('Grado').value = selectedRow.cells[2].innerHTML;
   document.getElementById('Grupo').value = selectedRow.cells[3].innerHTML;
}

function Actualizar(Datos){
selectedRow.cells[0].innerHTML = Datos.CodigoAl;
selectedRow.cells[1].innerHTML = Datos.Alumno;
selectedRow.cells[2].innerHTML = Datos.Grado;
selectedRow.cells[3].innerHTML = Datos.Grupo;

}

function Eliminar(td){
   if(confirm('¿Seguro que desea eliminar el registro?')){
    row = td.parentElement.parentElement;
    document.getElementById('Encabezados').deleteRow(row.rowIndex);
   }
   limpiar();
}

function limpiar(){
    document.getElementById('CodigoAl').value = '';
    document.getElementById('Alumno').value = '';
    document.getElementById('Grado').value = '';
    document.getElementById('Grupo').value = '';
}*/