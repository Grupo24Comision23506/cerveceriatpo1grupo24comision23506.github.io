/* -------------------------------------------------------------------------- */
/*                             Variables iniciales                            */
/* -------------------------------------------------------------------------- */
const apiUrl = 'https://api.sampleapis.com/beers/ale';
const contenedorProductos = document.querySelector('#contenedorProducto');
const formulario = document.querySelector('form');
const paginacion = document.querySelector('#paginacion');
const confirmarMayorDeEdad = document.querySelector('#confirmar');
const productosPorPagina = 16;
let productosFiltrados = [];

// Verifico que está levantada la flag de mayorEdad
if (localStorage.getItem('mayorEdad') == '' || localStorage.getItem('mayorEdad') == undefined) {
  // Cuando el documento termina de cargar
  document.addEventListener("DOMContentLoaded", function() {
      // Asigno la emergente
      var overlay = document.getElementById("overlay");
      // Asigno la de confirmación
      var confirmButton = document.getElementById("confirmar");
    
      // Cuando se hace click en confirmar, se cierra el modal
      confirmButton.addEventListener("click", function() {
        overlay.style.visibility = "hidden";
        overlay.style.opacity = "0";
      });
      
      // Aparee¿e a los 400ms de invocar a la pantalla
      setTimeout(function() {
        overlay.style.visibility = "visible";
        overlay.style.opacity = "1";
      }, 400); // Mostrar la ventana emergente después de 2 segundos
    });
}

// Sir aprueba el botón, confirma siempre y cuando no borre la caché
confirmarMayorDeEdad.addEventListener('click', (event) => {
  localStorage.setItem('mayorEdad', 1)
})

/* -------------------------------------------------------------------------- */
/*                     Funciones de control de formulario                     */
/* -------------------------------------------------------------------------- */

// FIXME: NO SE SI ES ESTO LO QUE NO FUNCIONA
  formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const busqueda = document.querySelector('#busqueda').value;
    const precioMin = document.querySelector('#precioMin').value;
    const precioMax = document.querySelector('#precioMax').value;
    filtrarProductos(busqueda, precioMin, precioMax);
  });

/* -------------------------------------------------------------------------- */
/*                            Funciones de filtrado                           */
/* -------------------------------------------------------------------------- */
function obtenerProductos() {
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    productosFiltrados = data
    mostrarProductos(1);
    mostrarPaginacion();
  })
  .catch(error => console.error(error));
}

// FIXME: NO APLICA EL FILTRO
function filtrarProductos(busqueda, precioMin, precioMax) {
  productosFiltrados = data.filter(producto => {
    const precio = parseFloat(producto.price.slice(1))
    if (
      // Si coincide el nombre con el que busqué ó si los precios coinciden
      producto.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      (precio === '' || (precio >= precioMin && precio <= precioMax))
    ) {
      return true;
    }
    return false;
  });

  mostrarProductos(1);
  mostrarPaginacion();
}



// Recorro el array de productos para mostrarlos
function mostrarProductos(pagina) {
  // Hago un contenedor que va a tener todos los datos del producto
  contenedorProductos.innerHTML = '';

  const inicio = (pagina - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPaginados = productosFiltrados.slice(inicio, fin);

  // Arranco a recorrer los productos para mostrarlos
  productosPaginados.forEach(producto => {
    // Hago la tarjeta
    const tarjeta = document.createElement('div');
    // Le añado la clase "tarjeta-proudcto" para tratarla en el CSS
    tarjeta.classList.add('tarjeta-producto');

    // Hago una imagen
    const imagen = document.createElement('img');
    // Asigno atributos según el array
    imagen.src = producto.image;
    imagen.alt = producto.name;
    // Añado esa imagen a la tarjeta
    tarjeta.appendChild(imagen);

    // Creo un h3
    const nombre = document.createElement('h3');
    // Le asigno el nombre a la tarjeta
    nombre.textContent = producto.name;
    // Le añado el h3 a la tarjeta
    tarjeta.appendChild(nombre);

    // Creo un p
    const precio = document.createElement('p');
    // Asigno el valor del precio
    precio.textContent = `${producto.price}`;
    // Añado el precio a la tarjeta
    tarjeta.appendChild(precio);

    // Finalmente, añado la tarjeta al contenedor.
    contenedorProductos.appendChild(tarjeta);
  });
}

function mostrarPaginacion() {
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  paginacion.innerHTML = '';

  for (let i = 1; i <= totalPaginas; i++) {
    const boton = document.createElement('button');
    boton.textContent = i;
    boton.addEventListener('click', () => {
      mostrarProductos(i);
    });
    paginacion.appendChild(boton);
  }
}

// Cargar todos los productos al cargar la página
obtenerProductos();