// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}
// Función para obtener parámetros de la URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
// Función para enviar a la pasarela de pago
function abrirPasarelaPago() {
  // Limpiar mensajes de error anteriores
  document.getElementById("error-nombre").textContent = "";
  document.getElementById("error-direccion").textContent = "";
  document.getElementById("error-ciudad").textContent = "";
  document.getElementById("error-codigoPostal").textContent = "";

  // Validar el formulario antes de abrir la pasarela de pago
  const nombre = document.getElementById("nombre").value;
  const direccion = document.getElementById("direccion").value;
  const ciudad = document.getElementById("ciudad").value;
  const codigoPostal = document.getElementById("codigoPostal").value;

  // Variable para rastrear si hay errores
  let hayErrores = false;

  // Validación de campos vacíos
  if (!nombre || !direccion || !ciudad || !codigoPostal) {
    document.getElementById("error-nombre").textContent = "Por favor, completa todos los campos requeridos.";
    hayErrores = true;
  }

  // Validación de campos vacíos con trim
  if (!nombre.trim() || !direccion.trim() || !ciudad.trim() || !codigoPostal.trim()) {
    document.getElementById("error-nombre").textContent = "Por favor, completa todos los campos requeridos.";
    hayErrores = true;
  }

  // Validación de longitud del nombre
  if (nombre.length < 3 || nombre.length > 50) {
    document.getElementById("error-nombre").textContent = "El nombre debe tener entre 3 y 50 caracteres.";
    hayErrores = true;
  }

  // Validación de caracteres especiales en el nombre
  const nombreRegex = /^[a-zA-Z\s]*$/;
  if (!nombreRegex.test(nombre)) {
    document.getElementById("error-nombre").textContent = "El nombre solo puede contener letras y espacios.";
    hayErrores = true;
  }

  // Validación de longitud de la dirección
  if (direccion.length < 5 || direccion.length > 100) {
    document.getElementById("error-direccion").textContent = "La dirección debe tener entre 5 y 100 caracteres.";
    hayErrores = true;
  }

  // Validación de caracteres especiales en la dirección
  const direccionRegex = /^[a-zA-Z0-9\s,.'-]*$/;
  if (!direccionRegex.test(direccion)) {
    document.getElementById("error-direccion").textContent = "La dirección contiene caracteres no permitidos.";
    hayErrores = true;
  }

  // Validación de longitud de la ciudad
  if (ciudad.length < 3 || ciudad.length > 50) {
    document.getElementById("error-ciudad").textContent = "La ciudad debe tener entre 3 y 50 caracteres.";
    hayErrores = true;
  }

  // Validación de caracteres especiales en la ciudad
  const ciudadRegex = /^[a-zA-Z\s]*$/;
  if (!ciudadRegex.test(ciudad)) {
    document.getElementById("error-ciudad").textContent = "La ciudad solo puede contener letras y espacios.";
    hayErrores = true;
  }

  // Validación de formato del código postal
  const codigoPostalRegex = /^\d{5}$/;
  if (!codigoPostalRegex.test(codigoPostal)) {
    document.getElementById("error-codigoPostal").textContent = "El código postal debe tener 5 dígitos.";
    hayErrores = true;
  }

  // Si hay errores, no abrir la pasarela de pago
  if (hayErrores) {
    return;
  }

  // Si todas las validaciones pasan, abrir la pasarela de pago
  const url = "/pasarelaPago";
  window.open(url, "_blank");
}

window.onload = function () {
  // Agregar evento al botón de pagar
  if (document.getElementById("pagarButton")) {
    const pagarButton = document.getElementById("pagarButton");
    if (pagarButton) {
      pagarButton.addEventListener("click", abrirPasarelaPago);
    }
  }

  // Inicialmente ocultar el contenido
  document.body.style.visibility = "hidden";

  // Formulario de Contáctenos
  if (document.getElementById("contact-form")) {
    document
      .getElementById("contact-form")
      .addEventListener("submit", async function (e) {
        e.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

        // Capturamos los datos del formulario
        const data = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          message: document.getElementById("message").value,
        };
        console.log("Datos del formulario a enviar:", data);

        try {
          const response = await fetch("/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Indicamos que enviamos JSON
            },
            body: JSON.stringify(data), // Convertimos el objeto a formato JSON
          });

          if (response.ok) {
            alert(
              "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto."
            );
          } else {
            const errorData = await response.json();
            console.error("Error del servidor:", errorData);
            alert(
              "Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente."
            );
          }
        } catch (error) {
          console.error("Error al enviar el formulario:", error);
          alert("Hubo un problema al enviar el mensaje. Revisa tu conexión.");
        }
      });
  }
  // Verificar si hay un mensaje en la URL
  const mensaje = getQueryParam("mensaje");
  if (mensaje) {
    const mensajeFlotante = document.getElementById("mensajeFlotante");
    // Mostrar el mensaje
    document.getElementById("mensaje").innerHTML = mensaje;
    mensajeFlotante.textContent = decodeURIComponent(mensaje);
    mensajeFlotante.classList.add("show");
    setTimeout(() => {
      mensajeFlotante.classList.remove("show");
    }, 3000);
  }

  // Verificar si hay un mensaje de error en la URL
  const errorMessage = getQueryParam("error");
  if (errorMessage) {
    const mensajeFlotante = document.getElementById("mensajeFlotante");
    mensajeFlotante.textContent = decodeURIComponent(errorMessage);
    mensajeFlotante.classList.add("show"); // Agregar clase para mostrar el mensaje

    setTimeout(() => {
      mensajeFlotante.classList.remove("show");
    }, 3000);
  }
  // Errores formulario login
  if (document.getElementById("login-form")) {
    // Verificar si hay errores en la URL
    const errors = getQueryParam("errors");
    if (errors) {
      const errorMessages = JSON.parse(decodeURIComponent(errors));
      errorMessages.forEach((error) => {
        // Aquí puedes decidir cómo mostrar los errores
        if (error.includes("email")) {
          document.getElementById("email-error").textContent = error;
        } else if (error.includes("contraseña")) {
          document.getElementById("password-error").textContent = error;
        } else {
          // Si es un error genérico, puedes mostrarlo en ambos campos o en un lugar específico
          document.getElementById("password-error").textContent = error;
        }
      });
    }
    // Obtener el parámetro 'data' de la URL
    const data = getQueryParam("data");
    // Si hay datos, rellenar el formulario
    if (data) {
      const formData = JSON.parse(decodeURIComponent(data));
      document.getElementById("email").value = formData.email || "";
    }
  }
  // Errores formulario register
  if (document.getElementById("register-form")) {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const errors = urlParams.get("errors");
    const data = urlParams.get("data");

    // Si hay errores, procesarlos
    if (errors) {
      const errorMessages = JSON.parse(decodeURIComponent(errors));
      errorMessages.forEach((error) => {
        // Mostrar errores en los campos correspondientes
        if (error.includes("nombre")) {
          document.getElementById("error-nombre").textContent = error;
        }
        if (error.includes("apellido")) {
          document.getElementById("error-apellido1").textContent = error;
        }
        if (error.includes("2º Apellido")) {
          document.getElementById("error-apellido2").textContent = error;
        }
        if (error.includes("email")) {
          document.getElementById("error-email").textContent = error;
        }
        if (error.includes("contraseña")) {
          document.getElementById("error-password").textContent = error;
        }
        if (error.includes("teléfono")) {
          document.getElementById("error-telefono").textContent = error;
        }
      });
    }
    // Si hay datos, rellenar el formulario
    if (data) {
      const formData = JSON.parse(decodeURIComponent(data));
      document.getElementById("nombre").value = formData.nombre || "";
      document.getElementById("apellido1").value = formData.apellido1 || "";
      document.getElementById("apellidos2").value = formData.apellido2 || "";
      document.getElementById("email").value = formData.email || "";
      document.getElementById("telefono").value = formData.telefono || "";
    }
  }

  // Función para manejar el envío del formulario de checkout
  if (document.getElementById("checkoutForm")) {
    document
      .getElementById("checkoutForm")
      .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevenir el envío por defecto

        const formData = new FormData(this);

        // Enviar los datos al servidor
        fetch("/process", {
          method: "POST",
          body: formData,
          credentials: "include", // Incluye las cookies
        })
          .then((response) => {
            if (response.redirected) {
              window.location.href = response.url; // Redirigir si hay una respuesta redirigida
            }
          })
          .catch((error) => {
            console.error("Error al procesar el checkout:", error);
          });
      });
  }

  // Verificar si la cookie del carrito existe
  const cartCookie = getCookie("cart");

  if (cartCookie) {
    const decodedCartCookie = decodeURIComponent(cartCookie);
    let cartItems = [];
    try {
      cartItems = JSON.parse(decodedCartCookie);
    } catch (e) {
      console.error("Error al parsear la cookie del carrito:", e);
    }

    // Mostrar la cantidad total de productos:
    let totalQuantity = 0;
    cartItems.forEach((item) => {
      totalQuantity += item.quantity; // Sumar las cantidades
    });

    // Mostrar la cantidad total
    const itemCountElement = document.getElementById("item-count");
    if (itemCountElement) {
      itemCountElement.textContent = totalQuantity > 0 ? totalQuantity : "0"; // Mostrar la cantidad total o "0"
    }
  } else {
    // Si no hay cookie, mostrar 0
    const itemCountElement = document.getElementById("item-count");
    if (itemCountElement) {
      itemCountElement.textContent = "0"; // Mostrar 0 si no hay artículos
    }
  }

  // Verificar si la cookie 'user_authenticated' está presente
  const usercookie = getCookie("user_authenticated");
  const divBotonAcceso = document.getElementById("divBotonAcceso");
  const divBotonLogout = document.getElementById("divBotonLogout");

  if (divBotonLogout || divBotonAcceso) {
    // Si la cookie NO existe (usuario no autenticado), mostramos el botón de acceso
    if (!usercookie) {
      divBotonAcceso.classList.add("show");
      divBotonAcceso.classList.remove("hidden");
      divBotonLogout.classList.remove("show");
      divBotonLogout.classList.add("hidden");
    } else {
      // Si la cookie existe (usuario autenticado), ocultamos el botón y mostramos botonLogout
      divBotonAcceso.classList.add("hidden");
      divBotonAcceso.classList.remove("show");
      divBotonLogout.classList.add("show");
      divBotonLogout.classList.remove("hidden");
    }
  }

  // Función para eliminar un producto del carrito
  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      // Obtener el ID del producto del atributo data-product-id
      const productId = button.getAttribute("data-product-id");

      // Realizamos la solicitud DELETE al servidor
      fetch(`/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar el producto");
          }
          return response.json(); // Convertimos la respuesta en JSON
        })
        .then((updatedCart) => {
          // Actualizar el contador de artículos
          const totalQuantity = updatedCart.reduce(
            (total, item) => total + item.quantity,
            0
          );
          const itemCountElement = document.getElementById("item-count");
          itemCountElement.textContent =
            totalQuantity > 0 ? totalQuantity : "-"; // Muestra "-" si no hay artículos
          location.reload(); // Recargar la página
        })
        .catch((error) => {
          console.error("Error al eliminar producto:", error);
        });
    });
  });

  // Añadir 1 o quitar 1 del carrito
  document.querySelectorAll(".quantity-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const action = this.getAttribute("data-action");
      const productId = this.getAttribute("data-product-id");

      // Enviar la solicitud al servidor
      fetch("/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, action }),
        credentials: "include", // Incluir cookies
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al actualizar la cantidad");
          }
          return response.json();
        })
        .then((updatedCart) => {
          // Actualizar la vista del carrito si es necesario
          location.reload(); // Recargar la página para reflejar los cambios
        })
        .catch((error) => {
          console.error("Error al actualizar la cantidad:", error);
        });
    });
  });

  // Comprobar si se ha iniciado sesión antes de ir a pagar
  if (document.querySelector('.divButtons-Cart a[href="/checkout"]')) {
    document
      .querySelector('.divButtons-Cart a[href="/checkout"]')
      .addEventListener("click", function (event) {
        const userAuthenticated = getCookie("user_authenticated"); // Obtener la cookie de autenticación

        if (!userAuthenticated) {
          event.preventDefault(); // Evitar la redirección
          alert("Debes iniciar sesión para proceder al pago."); // Mensaje de alerta
          window.location.href = "/login"; // Redirigir a la página de inicio de sesión
        }
      });
  }

  // Después de ejecutar el script, hacer visible el body
  document.body.style.visibility = "visible";
};
