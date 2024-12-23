const apiURL = "./api/productos.json";
const detalleContainer = document.getElementById("producto-detalle");
console.log("Detalle");

// Función para obtener el ID desde la URL
function obtenerIdDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Función para cargar el detalle del producto
async function cargarDetalleProducto() {
  const id = obtenerIdDesdeURL();

  if (!id) {
    detalleContainer.innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  try {
    const response = await fetch(apiURL);
    const productos = await response.json();
    const producto = productos.find((item) => item.id === parseInt(id));

    if (!producto) {
      detalleContainer.innerHTML = "<p>Producto no encontrado.</p>";
      return;
    }

detalleContainer.innerHTML = `
      <div class="card detalle-card">
          <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
          <div class="card-body">
              <h3 class="card-title">${producto.name}</h3>
              <p class="card-text">${producto.description}</p>
              <p class="card-text"><strong>Precio:</strong> $${producto.price.toFixed(2)}</p>
              <button class="btn btn-primary btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
          </div>
      </div>
  `;

    // Evento para agregar al carrito
    document
      .querySelector(".btn-agregar")
      .addEventListener("click", agregarAlCarrito);
  } catch (error) {
    console.error("Error al cargar los detalles del producto:", error);
  }
}

// Función para agregar al carrito (similar a la lógica en productos.js)
function agregarAlCarrito(event) {
  const productId = parseInt(event.target.dataset.id);
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const productoExistente = carrito.find(
    (producto) => producto.id === productId
  );

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    fetch(apiURL)
      .then((response) => response.json())
      .then((productos) => {
        const producto = productos.find((item) => item.id === productId);
        carrito.push({ ...producto, cantidad: 1 });
        localStorage.setItem("carrito", JSON.stringify(carrito));
      });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
}

// Cargar detalles al iniciar
cargarDetalleProducto();
