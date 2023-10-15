// Esta es una api alternativa a la usada

document.addEventListener("DOMContentLoaded", function() {
    const beersContainer = document.getElementById("beers");
    const cart = document.getElementById("cart");
    const totalElement = document.getElementById("total");
    const cartItems = [];

    // Función para cargar las cervezas desde la API
    function loadBeers() {
        fetch("https://api.punkapi.com/v2/beers")
            .then(response => response.json())
            .then(data => {
                data.forEach(beer => {
                    const beerElement = document.createElement("div");
                    beerElement.innerHTML = `
                        <h3>${beer.name}</h3>
                        <p>Precio: $${beer.abv}</p>
                        <button onclick="addToCart(${beer.id})">Agregar al Carrito</button>
                    `;
                    beersContainer.appendChild(beerElement);
                });
            })
            .catch(error => console.error("Error al cargar cervezas:", error));
    }

    // Función para agregar una cerveza al carrito
    function addToCart(beerId) {
        const beer = findBeerById(beerId);

        if (beer) {
            cartItems.push(beer);
            updateCart();
        }
    }

    // Función para buscar una cerveza por su ID
    function findBeerById(beerId) {
        return beers.find(beer => beer.id === beerId);
    }

    // Función para actualizar el carrito y calcular el total
    function updateCart() {
        cart.innerHTML = "";
        let total = 0;

        cartItems.forEach(beer => {
            const cartItem = document.createElement("li");
            cartItem.textContent = beer.name;
            cart.appendChild(cartItem);
            total += beer.abv;
        });

        totalElement.textContent = total.toFixed(2);
    }

    // Cargar las cervezas al cargar la página
    loadBeers();
});


/ Hacer una solicitud a la API1
fetch('URL_de_la_API1')
  .then(response => response.json())
  .then(data1 => {
    // Hacer una solicitud a la API2
    fetch('URL_de_la_API2')
      .then(response => response.json())
      .then(data2 => {
        // Multiplicar los valores obtenidos
        const resultado = data1.valor * data2.valor;

        // Mostrar el resultado en la página web
        const resultadoElement = document.getElementById('resultado');
        resultadoElement.textContent = `El resultado de la multiplicación es: ${resultado}`;
      })
      .catch(error => {
        console.error('Error al obtener datos de la API2', error);
      });
  })
  .catch(error => {
    console.error('Error al obtener datos de la API1', error);
  });

// ...

// Función para cargar las cervezas desde la API y crear las tarjetas
function loadBeers() {
    fetch("https://api.punkapi.com/v2/beers")
        .then(response => response.json())
        .then(data => {
            const carousel = document.querySelector(".carousel");

            data.forEach((beer, index) => {
                const card = document.createElement("div");
                card.classList.add("card");

                const front = document.createElement("div");
                front.classList.add("front");
                front.innerHTML = `
                    <h3>${beer.name}</h3>
                    <p>Precio: $${beer.abv}</p>
                    <button onclick="addToCart(${index})">Agregar al Carrito</button>
                `;

                const back = document.createElement("div");
                back.classList.add("back");
                back.innerHTML = `
                    <h3>Descripción:</h3>
                    <p>${beer.description}</p>
                `;

                card.appendChild(front);
                card.appendChild(back);
                carousel.appendChild(card);
            });
        })
        .catch(error => console.error("Error al cargar cervezas:", error));
}

// ...

// Cargar las cervezas y crear las tarjetas al cargar la página
loadBeers(); 