// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

window.onload = function() {

  // Inicialmente ocultar el contenido
document.body.style.visibility = 'hidden';

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
  
  // Verificar si la cookie del carrito existe
  const cartCookie = getCookie("cart");
  const carritoElement = document.getElementById("floating-cart");
    
  // Si la cookie del carrito existe, mostrar el carrito
  if (carritoElement) {
    if (cartCookie && carritoElement) {
      carritoElement.classList.add('show');   // Mostrar el carrito si la cookie está presente
      carritoElement.classList.remove("hidden");
    }else{
      carritoElement.classList.remove("show");
      carritoElement.classList.add("hidden");
    }
  }
  
  if (cartCookie) {
    // Si la cookie existe, parseamos su contenido (que es un JSON)
    const decodedCartCookie = decodeURIComponent(cartCookie);
    const cartItems = JSON.parse(decodedCartCookie);  // Convertir el string JSON en un objeto

    console.log(cartItems);  // Mostrar todo el carrito (Array)

    // Mostrar la cantidad total de productos:
    let totalQuantity = 0;
    cartItems.forEach(item => {
      totalQuantity += item.quantity;  // Sumar las cantidades
    });

    // Mostrar la cantidad total 
    const itemCountElement = document.getElementById("item-count");
    if (itemCountElement) {
      itemCountElement.textContent = totalQuantity > 0 ? totalQuantity : "-";
    }

    console.log("Total de productos en el carrito:", totalQuantity);  // Mostrar total
  } else {
    console.log("No hay carrito guardado en las cookies.");
  }

  // Verificar si la cookie 'user_authenticated' está presente
  const usercookie = getCookie('user_authenticated');
  const divBotonAcceso = document.getElementById('divBotonAcceso');
  const divBotonLogout = document.getElementById('divBotonLogout');

  if (( divBotonLogout ||divBotonAcceso)) {
    // Si la cookie NO existe (usuario no autenticado), mostramos el botón de acceso
    if (!usercookie) {
      divBotonAcceso.classList.add('show');
      divBotonAcceso.classList.remove('hidden');
      divBotonLogout.classList.remove("show");
      divBotonLogout.classList.add("hidden");

    } else {
      // Si la cookie existe (usuario autenticado), ocultamos el botón y mostramos botonLogout
      divBotonAcceso.classList.add('hidden');
      divBotonAcceso.classList.remove('show');
      divBotonLogout.classList.add("show");
      divBotonLogout.classList.remove("hidden");

    }
  }
  
// Función para eliminar un producto del carrito
  const removeButtons = document.querySelectorAll('.remove-btn');

  removeButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();

      // Obtener el ID del producto del atributo data-product-id
      const productId = button.getAttribute('data-product-id');
      
      // Realizamos la solicitud DELETE al servidor
      fetch(`/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json()) // Convertimos la respuesta en JSON
      .then(updatedCart => {
        console.log('Carrito actualizado:', updatedCart);

        location.reload(); // Recargar la página
      })
      .catch(error => {
        console.error('Error al eliminar producto:', error);
      });
    });
  });

  //Pruebas
if (document.getElementById("product-list")) {
  console.log("hola");
  
}

  // Después de ejecutar el script, hacer visible el body
  document.body.style.visibility = 'visible';
};
