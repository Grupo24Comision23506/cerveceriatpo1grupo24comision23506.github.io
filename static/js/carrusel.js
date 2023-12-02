const carrusel = document.querySelector(".img-galeria");
const imagenes = carrusel.querySelectorAll("li");
const botonIzquierda = document.querySelector("#boton-izquierda");
const botonDerecha = document.querySelector("#boton-derecha");

let indice = 0;

function moverCarrusel(direccion) {
  if (direccion === "izquierda") {
    indice = (indice - 1 + imagenes.length) % imagenes.length;
  } else {
    indice = (indice + 1) % imagenes.length;
  }
  const desplazamiento = -indice * 100 + "%";
  carrusel.style.transform = `translateX(${desplazamiento})`;
}

botonIzquierda.addEventListener("click", () => {
  moverCarrusel("izquierda");
});

botonDerecha.addEventListener("click", () => {
  moverCarrusel("derecha");
});
