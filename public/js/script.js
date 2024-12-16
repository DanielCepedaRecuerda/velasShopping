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

window.onload = function () {
  // Inicialmente ocultar el contenido
  document.body.style.visibility = "hidden";

  // Formulario de Contáctenos
  if (document.getElementById("contact-form")) {
    document
      .getElementById("contact-form")
      .addEventListener("submit", async function (e) {
        e.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

        const formData = new FormData(this);
        const response = await fetch("/api/contact", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert(
            "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto."
          );
        } else {
          alert(
            "Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente."
          );
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

  // Verificar si la cookie del carrito existe
  const cartCookie = getCookie("cart");
  const carritoElement = document.getElementById("floating-cart");

  // Si la cookie del carrito existe, mostrar el carrito
  if (cartCookie && carritoElement) {
    if (carritoElement) {
      carritoElement.classList.add("show"); // Mostrar el carrito si la cookie está presente
      carritoElement.classList.remove("hidden");
    } else {
      carritoElement.classList.remove("show");
      carritoElement.classList.add("hidden");
    }
  }

  if (cartCookie) {
    // Si la cookie existe, parseamos su contenido (que es un JSON)
    const decodedCartCookie = decodeURIComponent(cartCookie);
    const cartItems = JSON.parse(decodedCartCookie); // Convertir el string JSON en un objeto

    // Mostrar la cantidad total de productos:
    let totalQuantity = 0;
    cartItems.forEach((item) => {
      totalQuantity += item.quantity; // Sumar las cantidades
    });

    // Mostrar la cantidad total
    const itemCountElement = document.getElementById("item-count");
    if (itemCountElement) {
      itemCountElement.textContent = totalQuantity > 0 ? totalQuantity : "-";
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
        .then((response) => response.json()) // Convertimos la respuesta en JSON
        .then((updatedCart) => {
          location.reload(); // Recargar la página
        })
        .catch((error) => {
          console.error("Error al eliminar producto:", error);
        });
    });
  });

  // Después de ejecutar el script, hacer visible el body
  document.body.style.visibility = "visible";
};
