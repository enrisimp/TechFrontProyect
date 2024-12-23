// Referenciar el formulario
const form = document.querySelector("form");

// Añadir el evento submit al formulario
form.addEventListener("submit", (event) => {
  let isValid = true;

  // Obtener los campos
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // Validar campo Nombre
  if (name.value.trim() === "") {
    isValid = false;
    alert("El campo 'Nombre' es obligatorio.");
  }

  // Validar campo Correo Electrónico
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    isValid = false;
    alert("Por favor, ingrese un correo electrónico válido.");
  }

  // Validar campo Mensaje
  if (message.value.trim() === "") {
    isValid = false;
    alert("El campo 'Mensaje' es obligatorio.");
  }

  // Prevenir el envío si algún campo no es válido
  if (!isValid) {
    event.preventDefault();
  }
});
