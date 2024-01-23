// Variables globales para almacenar registros y total de ventas
let registros = cargarRegistrosDesdeJSON() || [];
let totalVentas = calcularTotalVentas();

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarListaRegistros();
    actualizarTotalVentas();
});

// Función para agregar un nuevo registro
function agregarRegistro() {
    // Obtener valores del formulario
    const producto = document.getElementById('producto').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const valorUnitario = parseFloat(document.getElementById('valorUnitario').value);

    // Validar que la cantidad y el valor unitario sean números positivos
    if (isNaN(cantidad) || cantidad <= 0 || isNaN(valorUnitario) || valorUnitario <= 0) {
        alert('Por favor, ingrese valores válidos para cantidad y valor unitario.');
        return;
    }

    // Verificar si el valor unitario es un múltiplo de 50
    if (valorUnitario % 50 !== 0) {
        const confirmacion = confirm('El valor unitario no es un múltiplo de 50. ¿Desea continuar con este registro?');
        if (!confirmacion) {
            return; // Salir de la función si el usuario elige no continuar
        }
    }

    // Generar la fecha actual con el formato dd-mm-AAAA hh:mm:ss
    const fecha = obtenerFechaActual();

    // Calcular el total de la venta
    const totalVenta = cantidad * valorUnitario;

    // Crear el nuevo registro
    const nuevoRegistro = {
        fecha: fecha,
        producto: producto,
        cantidad: cantidad,
        valorUnitario: valorUnitario,
        totalVenta: totalVenta
    };

    // Insertar el nuevo registro en la posición correcta para mantener el orden ascendente
    const posicionInsercion = encontrarPosicionInsercion(nuevoRegistro.fecha);
    registros.splice(posicionInsercion, 0, nuevoRegistro);

    // Guardar registros en el archivo JSON
    guardarRegistrosEnJSON(registros);

    // Actualizar la lista de registros y el total de ventas
    actualizarListaRegistros();
    actualizarTotalVentas();
    
    // Limpiar el formulario
    document.getElementById('registroForm').reset();
}

// Función para encontrar la posición de inserción en el arreglo ordenado
function encontrarPosicionInsercion(nuevaFecha) {
    for (let i = 0; i < registros.length; i++) {
        if (nuevaFecha.localeCompare(registros[i].fecha) < 0) {
            return i;
        }
    }
    return registros.length;
}

// Función para obtener la fecha actual con el formato dd-mm-AAAA hh:mm:ss
function obtenerFechaActual() {
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = agregarCeroAlInicio(ahora.getMonth() + 1);
    const dia = agregarCeroAlInicio(ahora.getDate());
    const horas = agregarCeroAlInicio(ahora.getHours());
    const minutos = agregarCeroAlInicio(ahora.getMinutes());
    const segundos = agregarCeroAlInicio(ahora.getSeconds());

    return `${dia}-${mes}-${año} ${horas}:${minutos}:${segundos}`;
}

// Función para agregar un cero al inicio si el número es menor que 10
function agregarCeroAlInicio(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

// Función para cargar registros desde el archivo JSON
function cargarRegistrosDesdeJSON() {
    try {
        const registrosString = localStorage.getItem('registros');
        return registrosString ? JSON.parse(registrosString) : [];
    } catch (error) {
        console.error('Error al cargar registros desde JSON:', error);
        return null;
    }
}

// Función para guardar registros en el archivo JSON
function guardarRegistrosEnJSON(registros) {
    try {
        localStorage.setItem('registros', JSON.stringify(registros));
    } catch (error) {
        console.error('Error al guardar registros en JSON:', error);
    }
}

// Función para actualizar la lista de registros en el HTML
function actualizarListaRegistros() {
    const listaRegistros = document.getElementById('listaRegistros');
    listaRegistros.innerHTML = '';

    registros.forEach(registro => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `<strong>${registro.fecha}</strong> - ${registro.producto} - Cantidad: ${registro.cantidad} - Valor Unitario: $${registro.valorUnitario.toFixed(2)} - Total: $${registro.totalVenta.toFixed(2)}`;
        listaRegistros.appendChild(listItem);
    });
}

// Función para calcular el total de ventas y actualizar en el HTML
function calcularTotalVentas() {
    return registros.reduce((total, registro) => total + registro.totalVenta, 0);
}

// Función para actualizar el total de ventas y actualizar en el HTML
function actualizarTotalVentas() {
    totalVentas = calcularTotalVentas();
    document.getElementById('totalVentas').textContent = `$${totalVentas.toFixed(2)}`;
}

// // Función para exportar registros en formato JSON
// function exportarRegistros() {
// // Obtener datos del localStorage
// const datosLocalStorage = localStorage.getItem('registros');

// // Verificar si hay datos
// if (datosLocalStorage) {
//     // Convertir datos a JSON
//     const datosJSON = JSON.stringify(JSON.parse(datosLocalStorage), null, 2);

//     // Crear un enlace de descarga
//     const enlaceDescarga = document.createElement('a');
//     enlaceDescarga.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(datosJSON);
//     enlaceDescarga.download = 'registros.json';

//     // Agregar el enlace al DOM
//     document.body.appendChild(enlaceDescarga);

//     // Simular un clic en el enlace para iniciar la descarga
//     enlaceDescarga.click();

//     // Eliminar el enlace después de la descarga
//     document.body.removeChild(enlaceDescarga);
// } else {
//     console.error('No hay datos en el localStorage para exportar.');
// }
// }

// // Agregar un botón para iniciar la exportación
// const botonExportar = document.createElement('button');
// botonExportar.textContent = 'Exportar Registros';
// botonExportar.addEventListener('click', exportarRegistros);
// document.body.appendChild(botonExportar);
