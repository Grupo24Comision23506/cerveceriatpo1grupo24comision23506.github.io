const productsAPI = "https://api.sampleapis.com/beers/ale"; // API de cervezas a utilizar
const exchangeRateAPI = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"; // API de valor dolar dia a utilizar

let productsData = [];
let exchangeRate = 1; // Valor del dólar blue

// Obtener datos de la API de cervezas
async function fetchProducts() {
    try {
        const response = await fetch(productsAPI);
        productsData = await response.json();
        // Cargar productos en la página
        displayProducts();
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

// Obtener el valor del dólar blue
async function fetchExchangeRate() {
    try {
        const response = await fetch(exchangeRateAPI);
        const data = await response.json();
        exchangeRate = data[0].casa.venta;
        // Actualizar precios en la página
        updatePrices();
    } catch (error) {
        console.error("Error al obtener el valor del dólar blue:", error);
    }
}

// Filtrar productos según los criterios
function filterProducts() {
    const productName = document.getElementById("productName").value.toLowerCase();
    const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Number.MAX_VALUE;
    
    const filteredProducts = productsData.filter(product => {
        const productPrice = parseFloat(product.price);
        return product.name.toLowerCase().includes(productName) && productPrice >= minPrice && productPrice <= maxPrice;
    });
    
    displayProducts(filteredProducts);
}

// Mostrar productos en la página
function displayProducts(products = productsData) {
    const productsDiv = document.getElementById("products");
    productsDiv.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio en USD: $${(product.price * exchangeRate).toFixed(2)}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Agregar al carrito</button>
        `;
        productsDiv.appendChild(productDiv);
    });
}

// Agregar producto al carrito
function addToCart(productName, productPrice) {
    const cartItems = document.getElementById("cartItems");
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `${productName} - Precio: $${(productPrice * exchangeRate).toFixed(2)}`;
    cartItems.appendChild(cartItem);
    updateTotalPrice();
}

// Actualizar el precio total en el carrito
function updateTotalPrice() {
    const cartItems = document.getElementById("cartItems").getElementsByTagName("li");
    let totalPrice = 0;
    
    for (const item of cartItems) {
        const price = parseFloat(item.innerText.match(/\d+\.\d+/)[0]);
        totalPrice += price;
    }
    
    document.getElementById("totalPrice").textContent = "$" + totalPrice.toFixed(2);
}

// Actualizar los precios en la página
function updatePrices() {
    const productPrices = document.querySelectorAll(".product p");
    
    productPrices.forEach(priceElement => {
        const originalPrice = parseFloat(priceElement.innerText.match(/\d+\.\d+/)[0]);
        priceElement.innerText = `Precio en USD: $${(originalPrice * exchangeRate).toFixed(2)}`;
    });
    
    updateTotalPrice();
}

// Eventos
document.getElementById("filterButton").addEventListener("click", filterProducts);

// Inicializar la página
fetchProducts();
fetchExchangeRate();

// Verifico que está levantada la wiget de mayorEdad
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
  