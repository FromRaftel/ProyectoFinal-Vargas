let productos = [];

// Carga productos desde archivo JSON
fetch("./js/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data; // Almaceno productos en la variable productos
    cargarProductos(productos); // Cargo productos en la página
  });

// Variables
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// Oculto aside cuando hago clic en una categoría
botonesCategorias.forEach((boton) =>
  boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
  })
);

// Cargo productos en el contenedor de productos
function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = ""; // Vacio contenedor de productos

  productosElegidos.forEach((producto) => {
    // Creo elemento HTML para cada producto
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
    // Agrego producto al contenedor de productos
    contenedorProductos.append(div);
  });

  actualizarBotonesAgregar(); // Actualizo eventos de botones Agregar
}

// Actualizo eventos de botones Agregar
function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

// Variables para el carrito de compras
let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

// Obtengo productos en el carrito desde el almacenamiento local
if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();
} else {
  productosEnCarrito = [];
}

// Agrego producto al carrito de compras
function agregarAlCarrito(e) {
  // Muestro notificación cuando agrego
  Toastify({
    text: "Producto agregado",
    duration: 2000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#160266",
      borderRadius: "1rem",
      textTransform: "uppercase",
      fontSize: ".80rem",
    },
    offset: {
      x: "1.5rem",
      y: "1.5rem",
    },
    onClick: function () {},
  }).showToast();

  // Obtengo el ID del botón clickeado
  const idBoton = e.currentTarget.id;
  // Busco en el arreglo de productos el que tenga el mismo ID que el botón
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );

  // Reviso si el producto ya se encuentra en el carrito
  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    // Si ya está en el carrito, incremento la cantidad
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    // Si no está en el carrito, lo agrego al arreglo de productos en el carrito
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  // Actualizo el contador del carrito
  actualizarNumerito();

  // Guardo los productos en el carrito en el almacenamiento local
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumerito() {
  // Calculo la suma de la cantidad de cada producto en el carrito
  let nuevoNumerito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  // Actualizo el número que se muestra en el contador del carrito
  numerito.innerText = nuevoNumerito;
}
