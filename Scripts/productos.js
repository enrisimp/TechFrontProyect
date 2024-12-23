const apiURL = "./productos.json";
const productosContainer = document.querySelector(".productos");

// Función para cargar productos desde la API
async function cargarProductos() {
  try {
    const response = await fetch(apiURL);
    const productos = await response.json();

    productos.forEach((producto) => {
      const card = document.createElement("div");
      card.classList.add("producto-card");
      card.innerHTML = `
                <img src="${producto.image}" alt="${producto.name}">
                <h3>${producto.name}</h3>
                <p>${producto.description}</p>
                <p><strong>Precio:</strong> $${producto.price.toFixed(2)}</p>
                <button class="btn-agregar" data-id="${
                  producto.id
                }">Agregar al carrito</button>
                <a href="./detalles.html?id=${
                  producto.id
                }" class="btn btn-primary">Ver más</a>
            `;
      productosContainer.appendChild(card);
    });

    // Agregar evento a botones de agregar al carrito
    document.querySelectorAll(".btn-agregar").forEach((button) => {
      button.addEventListener("click", agregarAlCarrito);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

// Función para agregar productos al carrito
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

// Cargar productos al iniciar
cargarProductos();
