window.onload = function() {
  // Formulario de Contáctenos
  if (document.getElementById("contact-form")) {
    document.getElementById("contact-form").addEventListener("submit", async function (e) {
      e.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

      const formData = new FormData(this);
      const response = await fetch("/api/contact", {
          method: "POST",
          body: formData
      });

      if (response.ok) {
          alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.");
      } else {
          alert("Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.");
      }
    });
  }
  // Función para obtener el valor de una cookie por su nombre
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  // Verificar si la cookie del carrito existe
  const cartCookie = getCookie("cart");
  const carritoElement = document.getElementById("floating-cart");
  const divBotonAcceso = document.getElementById('divBotonAcceso');
    
  // Si la cookie del carrito existe, mostrar el carrito
  if (cartCookie && carritoElement) {
    carritoElement.classList.add('show');  // Mostrar el carrito si la cookie está presente
  }

  if (cartCookie) {
    // Si la cookie existe, parseamos su contenido (que es un JSON)
    const decodedCartCookie = decodeURIComponent(cartCookie);
    const cartItems = JSON.parse(decodedCartCookie);  // Convertir el string JSON en un objeto

    // Ahora puedes trabajar con el objeto 'cartItems', que es un array de productos
    console.log(cartItems);  // Mostrar todo el carrito

    // Por ejemplo, para mostrar la cantidad total de productos:
    let totalQuantity = 0;
    cartItems.forEach(item => {
      totalQuantity += item.quantity;  // Sumar las cantidades
    });

    // Mostrar la cantidad total en el elemento con id="item-count"
    const itemCountElement = document.getElementById("item-count");
    if (itemCountElement) {
      itemCountElement.textContent = totalQuantity;  // Actualiza el número de productos
    }


    console.log("Total de productos en el carrito:", totalQuantity);  // Mostrar total
  } else {
    console.log("No hay carrito guardado en las cookies.");
  }

  // Verificar si la cookie 'user_authenticated' está presente
  const usercookie = getCookie('user_authenticated');
 
  if (!divBotonAcceso) return;

  if (usercookie) {
    divBotonAcceso.classList.add('hidden');  // Ocultar el botón si el usuario está logueado
  } else {
    divBotonAcceso.classList.remove('hidden');  // Mostrar el botón si el usuario no está logueado
  }
};
