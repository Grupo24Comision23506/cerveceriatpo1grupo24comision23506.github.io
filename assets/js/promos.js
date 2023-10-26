const carrusel = document.querySelector('.carrusel');
const cervezas = document.querySelectorAll('.cerveza');
const scrollStep = cervezas.length > 0 ? cervezas[0].offsetWidth : 0; // Calcula el ancho de cada tarjeta
let scrollValue = 0;

function scrollCarrusel(direction) {
  if (direction === 'right') {
    scrollValue += scrollStep;
  } else {
    scrollValue -= scrollStep;
  }

  scrollValue = Math.max(-carrusel.scrollWidth + carrusel.clientWidth, Math.min(0, scrollValue));

  carrusel.style.transform = `translateX(${scrollValue}px)`;
}

// Refactoriza el evento para no repetir código
function handleScrollClick(direction) {
  return () => scrollCarrusel(direction);
}

// Agrega controladores de eventos para los botones de desplazamiento
document.querySelector('#scrollLeft').addEventListener('click', handleScrollClick('left'));
document.querySelector('#scrollRight').addEventListener('click', handleScrollClick('right'));