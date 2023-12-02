const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sliderImages = document.querySelectorAll(".slider-image");

let currentImageIndex = 0;

function showImage(index) {
    sliderImages.forEach((image, i) => {
        if (i === index) {
            image.style.display = "block";
        } else {
            image.style.display = "none";
        }
    });
}

showImage(currentImageIndex);

prevBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + sliderImages.length) % sliderImages.length;
    showImage(currentImageIndex);
});

nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
    showImage(currentImageIndex);
});