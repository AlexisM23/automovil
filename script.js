function guardarDatos() {
    // Obtener valores del formulario
    var id = 'id_' + Date.now();
    var color = obtenerValor('color');
    var marca = obtenerValor('marca');
    var puertas = obtenerValor('puertas');
    var modelo = obtenerValor('modelo');
    var capacidad = obtenerValor('capacidad');
    var fecha = obtenerValor('fecha');
    var precio = obtenerValor('precio');
    var combustible = obtenerValor('combustible');
    var chasis = obtenerValor('chasis');
    var estado = obtenerValor('estado');

    // Validar campos
    if (!validarCampos()) {
        return;
    }

    // Crear objeto formData
    var formData = {
        id: id,
        color: color,
        marca: marca,
        puertas: puertas,
        modelo: modelo,
        capacidad: capacidad,
        fecha: fecha,
        precio: precio,
        combustible: combustible,
        chasis: chasis,
        estado: estado
    };

    // Guardar datos en el almacenamiento local
    var storedData = JSON.parse(localStorage.getItem('automoviles')) || [];
    storedData.push(formData);
    localStorage.setItem('automoviles', JSON.stringify(storedData));

    // Actualizar la tabla y limpiar los campos
    actualizarTabla();
    limpiarCampos();
}

// Función auxiliar para obtener el valor de un elemento del formulario por su ID
function obtenerValor(id) {
    return document.getElementById(id).value.trim();
}

function validarCampos() {
    if (color === "" || marca === "" || puertas === "" || modelo === "" || capacidad === "" || fecha === "" || precio === "" || combustible === "" || chasis === "" || estado === "") {
        alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return false;
    }

    switch (true) {
        case chasis.length < 17:
            alert("El número de chasis debe tener al menos 17 caracteres alfanuméricos.");
            return false;
        case isNaN(fecha) || fecha > new Date().getFullYear():
            alert("Por favor, ingrese un año de fabricación válido.");
            return false;
        // Otras validaciones específicas...
        default:
            return true;
    }
}

function guardarDatos() {
    if (!validarCampos()) {
        return;
    }

    // Resto de tu lógica para guardar datos
}

function limpiarCampos() {
    var campos = ['color', 'marca', 'puertas', 'modelo', 'capacidad', 'fabricacion', 'precio', 'combustible', 'chasis', 'velocidadMaxima'];

    campos.forEach(function (campo) {
        document.getElementById(campo).value = obtenerValor(campo);
    });

    var botonGuardarActualizar = document.getElementById('guardar-actualizar');
    botonGuardarActualizar.textContent = 'Guardar';
    botonGuardarActualizar.onclick = guardarDatos;
}

function obtenerValorYTrim(id) {
    return document.getElementById(id).value.trim();
}

function actualizarDatos(id) {
    var campos = ['color', 'marca', 'puertas', 'modelo', 'capacidad', 'fecha', 'precio', 'combustible', 'chasis', 'estado'];

    // Validar que todos los campos estén llenos
    if (campos.some(function(campo) { return obtenerValorYTrim(campo) === ""; })) {
        alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return;
    }

    // Obtener los datos almacenados
    var storedData = JSON.parse(localStorage.getItem('automoviles')) || [];

    // Encontrar el índice del elemento a actualizar
    var index = storedData.findIndex(function (item) {
        return item.id === id;
    });

    if (index !== -1) {
        // Actualizar los datos en el array
        campos.forEach(function(campo) {
            storedData[index][campo] = obtenerValorYTrim(campo);
        });

        // Guardar el array actualizado en el almacenamiento local
        localStorage.setItem('automoviles', JSON.stringify(storedData));

        // Actualizar la tabla y limpiar los campos
        actualizarTabla();
        limpiarCampos();
    } else {
        alert("No se pudo encontrar el elemento para actualizar.");
    }
}


function eliminarDatos(data) {
    var storedData = JSON.parse(localStorage.getItem('automoviles')) || [];

    storedData = storedData.filter(item => item.id !== data.id);

    localStorage.setItem('automoviles', JSON.stringify(storedData));
    actualizarTabla();
}


function renderizarAcciones(data) {
    function crearAccion(texto, onclickFunc) {
        var accion = document.createElement('span');
        accion.className = texto.toLowerCase();
        accion.textContent = texto;
        accion.onclick = onclickFunc;
        return accion;
    }

    var editar = crearAccion('Editar', function () {
        editarDatos(data);
    });

    var eliminar = crearAccion('Eliminar', function () {
        eliminarDatos(data);
    });

    var acciones = document.createElement('div');
    acciones.appendChild(editar);
    acciones.appendChild(eliminar);

    return acciones;
}

function editarDatos(data) {
    var campos = ['color', 'marca', 'puertas', 'modelo', 'capacidad', 'fecha', 'precio', 'combustible', 'chasis', 'estado'];

    campos.forEach(function (campo) {
        document.getElementById(campo).value = data[campo];
    });

    var botonGuardarActualizar = document.getElementById('guardar-actualizar');
    botonGuardarActualizar.textContent = 'Actualizar';
    botonGuardarActualizar.onclick = function () {
        actualizarDatos(data.id);
    };
}


function actualizarTabla() {
    var storedData = JSON.parse(localStorage.getItem('automoviles')) || [];
    var datosBody = document.getElementById('datos-body');
    var mensajeVacio = document.getElementById('mensaje-vacio');

    datosBody.textContent = ''; // Usar textContent para limpiar

    mensajeVacio.textContent = storedData.length === 0 ? 'No existen registros. ¡Prueba agregando uno nuevo!' : '';

    if (storedData.length > 0) {
        storedData.forEach(function (data) {
            var row = datosBody.insertRow();

            // Definir explícitamente las propiedades a mostrar en la tabla
            var propiedadesAMostrar = ['color', 'marca', 'puertas', 'modelo', 'capacidad', 'fecha', 'precio', 'combustible', 'chasis', 'estado'];

            propiedadesAMostrar.forEach(function (propiedad) {
                var cell = row.insertCell();
                cell.textContent = data[propiedad];
            });

            var accionesCell = row.insertCell();
            accionesCell.appendChild(renderizarAcciones(data));
        });
    }
}

function mostrarImagen() {
    var inputImagen = document.getElementById('imagen');
    var vistaPrevia = document.getElementById('vista-previa');

    vistaPrevia.innerHTML = ''; // Limpiar la vista previa

    if (inputImagen.files && inputImagen.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var imagen = document.createElement('img');
            imagen.src = e.target.result;
            vistaPrevia.appendChild(imagen);
        };

        reader.readAsDataURL(inputImagen.files[0]);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos del formulario
    const capacidadInput = document.getElementById('capacidad');
    const capacidadError = document.getElementById('capacidad-error');

    // Agregar eventos de escucha para las validaciones
    capacidadInput.addEventListener('input', validarCapacidad);

    // Función para validar la capacidad
    function validarCapacidad() {
        const capacidadValor = capacidadInput.value;
        // Verificar si la capacidad es un número
        if (isNaN(capacidadValor)) {
            capacidadError.textContent = 'Este campo requiere valores numéricos';
            capacidadError.classList.add('error-visible');
        } else {
            capacidadError.textContent = '';
            capacidadError.classList.remove('error-visible');
        }
    }
});

window.onload = function () {
    actualizarTabla();
};
