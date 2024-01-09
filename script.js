function guardarDatos() {
    var id = 'id_' + Date.now(); // Generar un ID único para cada fila
    var color = document.getElementById('color').value.trim();
    var marca = document.getElementById('marca').value.trim();
    var puertas = document.getElementById('puertas').value.trim();
    var modelo = document.getElementById('modelo').value.trim();
    var capacidad = document.getElementById('capacidad').value.trim();
    var fabricacion = document.getElementById('fabricacion').value.trim();
    var precio = document.getElementById('precio').value.trim();
    var combustible = document.getElementById('combustible').value.trim();
    var serie = document.getElementById('chasis').value.trim();
    var velocidadMaxima = document.getElementById('velocidadMaxima').value.trim();

    if (serie.length !== 17) {
        alert("El número de chasis debe tener exactamente 17 caracteres alfanuméricos.");
        return;
    }

    if (color === "" || marca === "" || puertas === "" || modelo === "" || capacidad === "" || fabricacion === "" || precio === "" || combustible === "" || serie === "" || velocidadMaxima === "") {
        alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return;
    }

    var añoActual = new Date().getFullYear();
    if (isNaN(fabricacion) || fabricacion > añoActual) {
        alert("Por favor, ingrese un año de fabricación válido.");
        return;
    }

    var formData = {
        id: id,
        color: color,
        marca: marca,
        puertas: puertas,
        modelo: modelo,
        capacidad: capacidad,
        fabricacion: fabricacion,
        precio: precio,
        combustible: combustible,
        serie: serie,
        velocidadMaxima: velocidadMaxima
    };

    var storedData = JSON.parse(localStorage.getItem('automoviles')) || [];
    storedData.push(formData);
    localStorage.setItem('automoviles', JSON.stringify(storedData));

    actualizarTabla();
    limpiarCampos();
}

function limpiarCampos() {
    document.getElementById('color').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('puertas').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('capacidad').value = '';
    document.getElementById('fabricacion').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('combustible').value = '';
    document.getElementById('chasis').value = '';
    document.getElementById('velocidadMaxima').value = '';

    // Cambiar el botón a "Guardar" después de limpiar los campos
    document.getElementById('guardar-actualizar').textContent = 'Guardar';
    document.getElementById('guardar-actualizar').onclick = function () {
        guardarDatos();
    };
}

function actualizarDatos(id) {
    var color = document.getElementById('color').value.trim();
    var marca = document.getElementById('marca').value.trim();
    var puertas = document.getElementById('puertas').value.trim();
    var modelo = document.getElementById('modelo').value.trim();
    var capacidad = document.getElementById('capacidad').value.trim();
    var fabricacion = document.getElementById('fabricacion').value.trim();
    var precio = document.getElementById('precio').value.trim();
    var combustible = document.getElementById('combustible').value.trim();
    var serie = document.getElementById('chasis').value.trim();
    var velocidadMaxima = document.getElementById('velocidadMaxima').value.trim();

    if (color === "" || marca === "" || puertas === "" || modelo === "" || capacidad === "" || fabricacion === "" || precio === "" || combustible === "" || serie === "" || velocidadMaxima === "") {
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
        storedData[index].color = color;
        storedData[index].marca = marca;
        storedData[index].puertas = puertas;
        storedData[index].modelo = modelo;
        storedData[index].capacidad = capacidad;
        storedData[index].fabricacion = fabricacion;
        storedData[index].precio = precio;
        storedData[index].combustible = combustible;
        storedData[index].serie = serie;
        storedData[index].velocidadMaxima = velocidadMaxima;

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

    storedData = storedData.filter(function (item) {
        return item.id !== data.id;
    });

    localStorage.setItem('automoviles', JSON.stringify(storedData));
    actualizarTabla();
}

function renderizarAcciones(data) {
    var editar = document.createElement('span');
    editar.className = 'editar';
    editar.textContent = 'Editar';
    editar.onclick = function () {
        editarDatos(data);
    };

    var eliminar = document.createElement('span');
    eliminar.className = 'eliminar';
    eliminar.textContent = 'Eliminar';
    eliminar.onclick = function () {
        eliminarDatos(data);
    };

    var acciones = document.createElement('div');
    acciones.appendChild(editar);
    acciones.appendChild(eliminar);

    return acciones;
}

function editarDatos(data) {
    document.getElementById('color').value = data.color;
    document.getElementById('marca').value = data.marca;
    document.getElementById('puertas').value = data.puertas;
    document.getElementById('modelo').value = data.modelo;
    document.getElementById('capacidad').value = data.capacidad;
    document.getElementById('fabricacion').value = data.fabricacion;
    document.getElementById('precio').value = data.precio;
    document.getElementById('combustible').value = data.combustible;
    document.getElementById('chasis').value = data.serie;
    document.getElementById('velocidadMaxima').value = data.velocidadMaxima;

    // Cambiar el botón a "Actualizar" después de cargar los datos
    document.getElementById('guardar-actualizar').textContent = 'Actualizar';
    document.getElementById('guardar-actualizar').onclick = function () {
        actualizarDatos(data.id);
    };
}

function actualizarTabla() {
    var storedData = JSON.parse(localStorage.getItem('automoviles')) || [];
    var datosBody = document.getElementById('datos-body');
    var mensajeVacio = document.getElementById('mensaje-vacio');

    datosBody.innerHTML = '';
    mensajeVacio.textContent = '';

    if (storedData.length === 0) {
        mensajeVacio.textContent = 'No existen registros. ¡Prueba agregando uno nuevo!';
    } else {
        storedData.forEach(function (data) {
            var row = datosBody.insertRow();

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var cell = row.insertCell();
                    cell.textContent = data[key];
                }
            }

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
    const precioInput = document.getElementById('precio');
    const precioError = document.getElementById('precio-error');
    const chasisInput = document.getElementById('chasis');
    const chasisError = document.getElementById('chasis-error');
    const velocidadMaximaInput = document.getElementById('velocidadMaxima');
    const velocidadMaximaError = document.getElementById('velocidadMaxima-error');

    // Agregar eventos de escucha para las validaciones
    capacidadInput.addEventListener('input', validarCapacidad);
    precioInput.addEventListener('input', validarPrecio);
    chasisInput.addEventListener('input', validarChasis);
    velocidadMaximaInput.addEventListener('input', validarVelocidadMaxima);

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
    function validarPrecio() {
        const precioValor = precioInput.value;
        // Verificar si el precio es un número
        if (isNaN(precioValor)) {
            precioError.textContent = 'Este campo requiere valores numéricos';
            precioError.classList.add('error-visible');
        } else {
            precioError.textContent = '';
            precioError.classList.remove('error-visible');
        }
    }
    function validarChasis() {
        const chasisValor = chasisInput.value;
        // Verificar si el número de chasis tiene más de 17 caracteres
        if (chasisValor.length > 17) {
            chasisError.textContent = 'Este campo requiere solo 17 caracteres';
            chasisError.classList.add('error-visible');
        } else {
            chasisError.textContent = '';
            chasisError.classList.remove('error-visible');
        }
    }
    function validarVelocidadMaxima() {
        const velocidadMaximaValor = velocidadMaximaInput.value;
        // Verifica si la velocidad máxima es un número
        if (isNaN(velocidadMaximaValor)) {
            velocidadMaximaError.textContent = 'Este campo requiere valores numéricos';
            velocidadMaximaError.classList.add('error-visible');
        } else {
            velocidadMaximaError.textContent = '';
            velocidadMaximaError.classList.remove('error-visible');
        }
    }
});

window.onload = function () {
    actualizarTabla();
};
