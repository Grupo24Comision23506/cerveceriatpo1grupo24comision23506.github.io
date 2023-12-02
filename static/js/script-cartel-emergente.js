script.jsdocument.addEventListener("DOMContentLoaded", function() {
  const popup = document.querySelector(".popup-oferta");
popup.style.display = "block";
});
  
function closePopup() {
  const popup = document.querySelector(".popup-oferta");
  popup.style.display = "none";
}