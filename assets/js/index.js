const { log } = console;

import { Render } from "./Render.js";
import { renderData } from "./renderData.js";

const app = new Render("app");
const API_DATA = "https://api.sampleapis.com/beers/ale";
const API_DOLAR = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
const confirmarMayorDeEdad = document.querySelector('#confirmar');

app.fetchData(API_DATA, API_DOLAR, renderData);

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
        s
        // Apareece a los 400ms de invocar a la pantalla
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