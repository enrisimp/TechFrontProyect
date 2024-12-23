const carritoContainer = document.getElementById("carrito-container");
const carritoTotal = document.getElementById("carrito-total");

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carritoContainer.innerHTML = "";
  let total = 0;

  carrito.forEach((producto) => {
    const item = document.createElement("div");
    item.classList.add("carrito-item");
    item.innerHTML = `
            <span>${producto.name}</span>
            <input type="number" min="1" value="${
              producto.cantidad
            }" data-id="${producto.id}" class="input-cantidad">
            <span>$${(producto.price * producto.cantidad).toFixed(2)}</span>
            <button class="btn-eliminar" data-id="${
              producto.id
            }">Eliminar</button>
        `;

    total += producto.price * producto.cantidad;
    carritoContainer.appendChild(item);
  });

  carritoTotal.textContent = `Total: $${total.toFixed(2)}`;

  // Eventos para modificar cantidad y eliminar productos
  document.querySelectorAll(".input-cantidad").forEach((input) => {
    input.addEventListener("change", cambiarCantidad);
  });
  document.querySelectorAll(".btn-eliminar").forEach((button) => {
    button.addEventListener("click", eliminarProducto);
  });
}

// Función para cambiar la cantidad de un producto
function cambiarCantidad(event) {
  const productId = parseInt(event.target.dataset.id);
  const nuevaCantidad = parseInt(event.target.value);
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const producto = carrito.find((item) => item.id === productId);
  if (producto) {
    producto.cantidad = nuevaCantidad > 0 ? nuevaCantidad : 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
  }
}

// Función para eliminar un producto del carrito
function eliminarProducto(event) {
  const productId = parseInt(event.target.dataset.id);
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito = carrito.filter((producto) => producto.id !== productId);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

// Cargar el carrito al iniciar
cargarCarrito();
