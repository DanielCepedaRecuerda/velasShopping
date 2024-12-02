window.onload = function() {
  const cart = req.cookies.cart; // Accede a los datos de la cookie "cart"
console.log(cart);

  // Formulario Contáctenos
  if (document.getElementById("contract-form")) {
    document.getElementById("contact-form").addEventListener("submit", async function (e) {
      e.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional

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
  console.log(cartCookie);
  
  const carritoElement = document.getElementById("floating-cart");
    
  // Si la cookie del carrito existe, mostrar el carrito
  if (cartCookie && carritoElement) {
    divBotonAcceso.classList.add('show');  // Mostrar el botón si está logueado
  }

if (cartCookie) {
  // Si la cookie existe, parseamos su contenido (que es un JSON)
  const cartItems = JSON.parse(cartCookie);  // Convertir el string JSON en un objeto

  // Ahora puedes trabajar con el objeto 'cartItems', que es un array de productos
  console.log(cartItems);  // Mostrar todo el carrito

  // Por ejemplo, para mostrar la cantidad total de productos:
  let totalQuantity = 0;
  cartItems.forEach(item => {
    totalQuantity += item.quantity;  // Sumar las cantidades
  });
  document.getElementById("item-count").textContent = totalQuantity;
  console.log("Total de productos en el carrito:", totalQuantity);  // Mostrar total
} else {
  console.log("No hay carrito guardado en las cookies.");
}

   // Verificar si la cookie 'user_authenticated' está presente
   const usercookie = getCookie('user_authenticated');
   const divBotonAcceso = document.getElementById('divBotonAcceso');
 
   if (!divBotonAcceso) return;

  if (usercookie) {
    divBotonAcceso.classList.add('hidden');  // Mostrar el botón si está logueado

  } else {
    divBotonAcceso.classList.remove('hidden');  // Ocultar el botón si no está logueado

  }
};
