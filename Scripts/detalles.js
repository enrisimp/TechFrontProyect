const apiURL = "../productos.json";
const detalleContainer = document.getElementById("producto-detalle");

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
            <img src="${producto.image}" alt="${producto.name}">
            <h3>${producto.name}</h3>
            <p>${producto.description}</p>
            <p><strong>Precio:</strong> $${producto.price.toFixed(2)}</p>
            <button class="btn-agregar" data-id="${
              producto.id
            }">Agregar al carrito</button>
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
