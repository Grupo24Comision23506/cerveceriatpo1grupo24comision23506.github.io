script.jsdocument.addEventListener("DOMContentLoaded", function() {
  const popup = document.querySelector(".popup");
  popup.style.display = "block";
});

function closePopup() {
  const popup = document.querySelector(".popup");
  popup.style.display = "none";
}