# Registro de Ventas - Sitio Web

## Descripción del Proyecto

Este proyecto consiste en un pequeño sitio web diseñado para funcionar como un registro de ventas diarias para una ferretería. La interfaz simple permite a los usuarios registrar detalles de ventas, como producto, cantidad y valor unitario, a través de un formulario en línea. Además, ofrece la posibilidad de exportar todos los registros en formato JSON para su posterior análisis.

## Estructura del Proyecto

El proyecto consta de dos archivos principales:

1. **index.html**
   - Este archivo contiene la estructura HTML del sitio web. Utiliza Bootstrap para estilos y presenta un formulario para ingresar detalles de ventas, una lista de registros y un total acumulado de ventas.

2. **core.js**
   - El archivo JS proporciona la lógica del lado del cliente. Gestiona la manipulación del DOM, la validación de entradas del formulario, el cálculo del total de ventas y la exportación de registros en formato JSON.

## Instrucciones de Uso

1. **Ingresar Nuevos Registros**
   - Completa los campos del formulario (Producto, Cantidad, Valor Unitario) y haz clic en "Agregar Registro" para registrar una nueva venta.

2. **Descargar Registros**
   - Haz clic en "Descargar Registros" para exportar todos los registros en formato JSON. El archivo descargado se llamará `registros.json`.

3. **Visualizar Registros Actuales**
   - La sección de "Lista de Registros" muestra todos los registros ingresados hasta el momento, con detalles como fecha, producto, cantidad, valor unitario y total de venta.

4. **Total de Ventas**
   - El total acumulado de todas las ventas se muestra en la parte inferior de la página.

## Consideraciones Importantes

- **Validación de Datos:** El sistema valida que la cantidad y el valor unitario ingresados sean números positivos. Además, verifica si el valor unitario es un múltiplo de 50 y solicita confirmación al usuario en caso contrario.

- **Orden de Registros:** Los registros se mantienen ordenados cronológicamente en el archivo JSON y en la visualización en la página.

- **Exportación en JSON:** La función "Descargar Registros" crea un archivo JSON con los datos actuales y lo descarga automáticamente al dispositivo del usuario.

¡Utiliza este sitio web para mantener un registro eficiente de las ventas diarias en tu ferretería! Si tienes alguna pregunta o sugerencia, no dudes en contactar al autor.
