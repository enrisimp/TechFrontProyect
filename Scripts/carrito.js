const carritoContainer = document.getElementById("carrito-container");
const carritoTotal = document.getElementById("carrito-total");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const realizarCompraBtn = document.getElementById("realizar-compra");
const formularioCompra = document.getElementById("formulario-compra");
const finalizarCompraBtn = document.getElementById("finalizar-compra");
const formulario = document.getElementById("formulario");

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carritoContainer.innerHTML = "";
  let total = 0;

  carrito.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${producto.image}" alt="${producto.name}" class="miniatura"></td>
      <td>
        ${producto.name}
      </td>
      <td><input type="number" min="1" value="${producto.cantidad}" data-id="${
      producto.id
    }" class="input-cantidad"></td>
      <td>$${(producto.price * producto.cantidad).toFixed(2)}</td>
      <td><button class="btn-eliminar btn btn-danger btn-sm" data-id="${
        producto.id
      }">Eliminar</button></td>
    `;
    total += producto.price * producto.cantidad;
    carritoContainer.appendChild(row);
  });

  carritoTotal.textContent = `Total: $${total.toFixed(2)}`;

  document.querySelectorAll(".input-cantidad").forEach((input) => {
    input.addEventListener("change", cambiarCantidad);
  });
  document.querySelectorAll(".btn-eliminar").forEach((button) => {
    button.addEventListener("click", eliminarProducto);
  });
}

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

function eliminarProducto(event) {
  const productId = parseInt(event.target.dataset.id);
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito = carrito.filter((producto) => producto.id !== productId);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  formularioCompra.classList.remove("visible");
  cargarCarrito();
}

function realizarCompra() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega productos antes de comprar.");
    return;
  }
  formularioCompra.classList.add("visible");
}

finalizarCompraBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Evita que el formulario recargue la página
  const nombre = document.getElementById("nombre").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const tarjeta = document.getElementById("tarjeta").value.trim();

  if (!nombre || !direccion || !tarjeta) {
    alert("Por favor, completa todos los campos del formulario.");
    return;
  }

  alert("Gracias por su compra!");
  localStorage.removeItem("carrito");
  cargarCarrito();
  formularioCompra.classList.remove("visible");
});

vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
realizarCompraBtn.addEventListener("click", realizarCompra);

cargarCarrito();
formularioCompra.classList.remove("visible");
