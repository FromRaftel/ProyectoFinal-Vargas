//utilizo local storage
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
//seleccion de elementos del html
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {
  //verificar si el carrito tiene productos
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    //desactivo el contenedor de vacio y se activan los demas contenedores
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");
    //limpia el contenido del contenedor de producots
    contenedorCarritoProductos.innerHTML = "";
    // Itero a traves de los productos en el carrito y creo un elemento div para c/u
    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
                <img class="carrito-producto-imagen" src="${
                  producto.imagen
                }" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${
                  producto.id
                }"><i class="bi bi-trash-fill"></i></button>
            `;
      // Agrega el elemento div al contenedor de productos del carrito
      contenedorCarritoProductos.append(div);
    });
    // Actualizo los botones de eliminar y total del carrito
    actualizarBotonesEliminar();
    actualizarTotal();
  } else {
    // Activo el contenedor de "carrito vacío" y desactivo los otros contenedores
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  // coloco mensaje de NOTIFICACION
  Toastify({
    text: "Producto eliminado",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#040a05",
      borderRadius: "0.25rem",
      textTransform: "uppercase",
      fontSize: ".75rem",
    },
    offset: {
      x: "1.5rem",
      y: "1.5rem",
    },
    onClick: function () {},
  }).showToast();

  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idBoton
  );

  productosEnCarrito.splice(index, 1);
  // cargo productos del carrito actualizados
  cargarProductosCarrito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro de eliminar?',
        html: `Se van a eliminar ${productosEnCarrito.reduce(
          (acc, producto) => acc + producto.cantidad,
          0
        )} productos.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar todo',
        cancelButtonText: 'No, conservar',
        cancelButtonColor: '#d33',
        confirmButtonColor: '#0a0d0f',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          // Eliminar productos
          productosEnCarrito.length = 0;
          localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
          // Recargar productos del carrito vacío
          cargarProductosCarrito();
          // Mostrar mensaje de éxito
          Swal.fire({
            title: 'Eliminado',
            text: 'El carrito ha sido vaciado con éxito',
            icon: 'success',
            confirmButtonColor: '#000000',
          });
        }
      });
}

function actualizarTotal() {
  // aqui calculo el total sumando los precios de los productos en el carrito
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
  // vaciar carrito
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
  // deshabilito los contenedores del carrito con productos
  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  // habilito el contenedor para mostrar que la compra fue efectuada
  contenedorCarritoComprado.classList.remove("disabled");
}
