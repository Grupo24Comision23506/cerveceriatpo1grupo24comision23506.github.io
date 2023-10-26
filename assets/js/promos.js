const carrusel = document.querySelector(".carrusel-inner");
const cervezas = document.querySelectorAll(".cerveza");
const botonesContainer = document.querySelector(".botones");

let currentIndex = 0;

for (let i = 0; i < cervezas.length; i++) {
  const boton = document.createElement("button");
  boton.classList.add("boton");
  boton.setAttribute("data-slide", i);
  botonesContainer.appendChild(boton);
}

const botones = document.querySelectorAll('.boton');

botones[0].classList.add('activo');

botones.forEach((boton, i) => {
  boton.addEventListener('click', () => {
    currentIndex = i; // Actualiza el índice actual
    botones.forEach((cadaPunto, j) => {
      if (j === i) {
        cadaPunto.classList.add('activo');
      } else {
        cadaPunto.classList.remove('activo');
      }
    });
    updateCarrusel(); // Actualiza el carrusel
  });
});

function updateCarrusel() {
  cervezas.forEach((cerveza, i) => {
    const offset = i - currentIndex;
    let transformValue = `translateX(${offset * 100}%)`;

    // Ajusta la transformación solo si no es el último elemento
    if (i === cervezas.length - 1) {
      transformValue = `translateX(${offset * 100 - 10}%)`;
    } else if (i === cervezas.length - 2) {
      transformValue = `translateX(${offset * 100 - 10}%)`;
    } else if (i === cervezas.length - 3) {
      transformValue = `translateX(${offset * 100 - 7}%)`;
    } else if (i === cervezas.length - 4) {
      transformValue = `translateX(${offset * 100 - 5}%)`;
    } else if (i === cervezas.length - 5) {
      transformValue = `translateX(${offset * 100 - 4}%)`;
    } else if (i === cervezas.length - 6) {
      transformValue = `translateX(${offset * 100 - 2}%)`;
    } else {
      transformValue = `translateX(${offset * 100}%)`;
    }

    cerveza.style.transform = transformValue;
  });

  // Calcula el valor de transformación para centrar horizontalmente el carrusel
  const carruselWidth = carrusel.offsetWidth;
  const imageWidth = cervezas[0].offsetWidth;
  const targetPosition = -currentIndex * imageWidth + (carruselWidth - imageWidth) / 2;

  // Aplica la transformación horizontal al carrusel
  carrusel.style.transform = `translateX(${targetPosition}px) translateY(0)`;
}

updateCarrusel();
