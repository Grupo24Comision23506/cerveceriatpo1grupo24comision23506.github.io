const menuButton = document.getElementById("menu-button");
const widget = document.getElementById("block-abipacowidget");
const closeButton = document.querySelector(".widget_close--btn");

menuButton.addEventListener("click", toggleMenu);
closeButton.addEventListener("click", toggleMenu);

function toggleMenu() {
    const menuState = menuButton.getAttribute("data-menu-state");

    if (menuState === "closed") {
        widget.style.display = "block";
        menuButton.setAttribute("data-menu-state", "open");
    } else {
        widget.style.display = "none";
        menuButton.setAttribute("data-menu-state", "closed");
    }
}