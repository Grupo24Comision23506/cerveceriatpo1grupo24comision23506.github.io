// Iniciar con la primera imagen visible
images[currentImageIndex].style.opacity = 1;

document.addEventListener("DOMContentLoaded", function () {
    let currentImageIndex = 0;
    const images = document.querySelectorAll("#image-tarjetas img");
    function changeImage(direction) {
        images[currentImageIndex].style.opacity = 0;
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
        images[currentImageIndex].style.opacity = 1;
    }
       // Iniciar con la primera imagen visible
    images[currentImageIndex].style.opacity = 1;
});