/* -------------------------------------------------------------------------- */
/*                             Variables iniciales                            */
/* -------------------------------------------------------------------------- */
const apiUrl = 'https://api.sampleapis.com/beers/ale';
const apiDolar = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
const contenedorProductos = document.querySelector('#contenedorProducto');
const formulario = document.querySelector('form');
const paginacion = document.querySelector('#paginacion');
const confirmarMayorDeEdad = document.querySelector('#confirmar');
const productosPorPagina = 16;
let reemplazarComaXPunto
let productosFiltrados = [];
let valorDolar = [];

// Verifico que está levantada la flag de mayorEdad
if (localStorage.getItem('mayorEdad') == '' || localStorage.getItem('mayorEdad') == undefined) {
  // Cuando el documento termina de cargar
  document.addEventListener("DOMContentLoaded", function () {
    // Asigno la emergente
    var overlay = document.getElementById("overlay");
    // Asigno la de confirmación
    var confirmButton = document.getElementById("confirmar");

    // Cuando se hace click en confirmar, se cierra el modal
    confirmButton.addEventListener("click", function () {
      overlay.style.visibility = "hidden";
      overlay.style.opacity = "0";
    });

    // Aparee¿e a los 400ms de invocar a la pantalla
    setTimeout(function () {
      overlay.style.visibility = "visible";
      overlay.style.opacity = "1";
    }, 400); // Mostrar la ventana emergente después de 2 segundos
  });
}

// Sir aprueba el botón, confirma siempre y cuando no borre la caché
confirmarMayorDeEdad.addEventListener('click', (event) => {
  localStorage.setItem('mayorEdad', 1)
})

// Armado de lista

async function obtenerProductos() {
  try {
    const productos = await fetch(apiUrl)
    const productosJSON = await productos.json()
    productosFiltrados = productosJSON
    try {
      const obtenerDolar = await fetch(apiDolar)
      const dolarJSON = await obtenerDolar.json()
      valorDolar = dolarJSON[0].casa.compra
    } catch (error) {
      console.error('Error al obtener el valor del dolar: ', error);
    } finally {
      mostrarProductos(1);
    }
  } catch (error) {
    console.error('Error al traer productos: ', error);
  }
}

function obtenerValorDolar() {
  fetch(apiDolar)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      valorDolar = data[0].casa.compra
    })
}

// Cargar todos los productos y el valor del dolar al cargar la página
obtenerProductos();
// obtenerValorDolar();

// Recorro el array de productos para mostrarlos
function mostrarProductos(pagina) {
  // Hago un contenedor que va a tener todos los datos del producto
  contenedorProductos.innerHTML = '';
  mostrarPaginacion(productosFiltrados);
  const inicio = (pagina - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPaginados = productosFiltrados.slice(inicio, fin);
  generadorProducto(productosPaginados)
}

function mostrarPaginacion(objetoBoton, filtrado = false) {
  const totalPaginas = Math.ceil(objetoBoton.length / productosPorPagina);
  paginacion.innerHTML = '';

  // Investigar para hacerlo mejor, no supe cómo pero si filtra, puse que el boton desaparezca. NO ES CORRECTO
  for (let i = 1; i <= totalPaginas; i++) {
    if (!filtrado) {
      const boton = document.createElement('button');
      boton.textContent = i;
      boton.addEventListener('click', () => {
        mostrarProductos(i);
      });
      paginacion.appendChild(boton);
    }
  }
}

function generadorProducto(productosPaginados) {
  reemplazarComaXPunto = valorDolar.replace(",", ".");
  productosPaginados.forEach(producto => {
    const precioSinSigno = parseFloat(producto.price.replace("$", ""));
    const multiplication = precioSinSigno * reemplazarComaXPunto;
    const numeroFormateado = multiplication.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
    // Hago la tarjeta
    const tarjeta = document.createElement('div');
    // Le añado la clase "tarjeta-proudcto" para tratarla en el CSS
    tarjeta.classList.add('tarjeta-producto');

    // Hago una imagen
    const imagen = document.createElement('img');
    imagen.classList.add('tarjeta-image')
    // Asigno atributos según el array
    imagen.src = producto.image;
    imagen.alt = producto.name;
    imagen.title = producto.name;
    // Añado esa imagen a la tarjeta
    tarjeta.appendChild(imagen);

    // Creo un h3
    const nombre = document.createElement('h3');
    nombre.classList.add('tarjeta-nombre')
    // Le asigno el nombre a la tarjeta
    nombre.textContent = producto.name;
    // Le añado el h3 a la tarjeta
    tarjeta.appendChild(nombre);

    // Creo un p
    const precio = document.createElement('p');
    precio.classList.add('tarjeta-precio')
    // Asigno el valor del precio
    precio.textContent = `${numeroFormateado}`;
    // Añado el precio a la tarjeta
    tarjeta.appendChild(precio);

    // Finalmente, añado la tarjeta al contenedor.
    contenedorProductos.appendChild(tarjeta);
  })
}

/* -------------------------------------------------------------------------- */
/*                            Funciones de filtrado                           */
/* -------------------------------------------------------------------------- */

busqueda.addEventListener('keyup', filtrado);
precioMin.addEventListener('keyup', filtrado);
precioMax.addEventListener('keyup', filtrado);

function filtrado() {
  reemplazarComaXPunto = valorDolar.replace(",", ".");
  // Obtiene los valores de los campos de entrada
  const busquedaTexto = busqueda.value.toLowerCase();
  const precioMinValue = parseFloat(precioMin.value);
  const precioMaxValue = parseFloat(precioMax.value);

  // Filtra los productos en función de los tres campos
  const nuevosProductos = productosFiltrados.filter(producto => {
    const precioSinSigno = parseFloat(producto.price.replace("$", "").replace(",", ""));
    const multiplication = precioSinSigno * reemplazarComaXPunto;
    const numeroFormateado = multiplication.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
    const nombreProducto = producto.name.toLowerCase();
    const precioProducto = parseFloat(numeroFormateado.replace("$", "").replace(",", ""));
    
    // Compara el nombre y el precio con los valores de búsqueda
    const cumpleBusqueda = nombreProducto.includes(busquedaTexto);
    const cumplePrecioMin = isNaN(precioMinValue) || precioProducto >= precioMinValue;
    const cumplePrecioMax = isNaN(precioMaxValue) || precioProducto <= precioMaxValue;

    return cumpleBusqueda && cumplePrecioMin && cumplePrecioMax;
  });

  // Limpia el contenido del contenedor
  contenedorProductos.innerHTML = '';

  // Muestra la paginación y productos filtrados
  mostrarPaginacion(nuevosProductos, true);
  const inicio = (1 - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPaginados = nuevosProductos.slice(inicio, fin);
  generadorProducto(productosPaginados);
}
