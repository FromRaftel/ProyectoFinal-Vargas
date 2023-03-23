// Selecciono el elemento del DOM con el ID "open-menu"
const openMenu = document.querySelector("#open-menu");

// Selecciono el elemento del DOM con el ID "close-menu"
const closeMenu = document.querySelector("#close-menu");

// Selecciono el elemento del DOM que es una etiqueta "aside"
const aside = document.querySelector("aside");

// Agrego un evento de "click" al elemento openMenu
openMenu.addEventListener("click", () => {
// Agrega la clase "aside-visible" al elemento aside
aside.classList.add("aside-visible");
})

// Agrego un evento de "click" al elemento closeMenu
closeMenu.addEventListener("click", () => {
// Remueve la clase "aside-visible" del elemento aside
aside.classList.remove("aside-visible");
})