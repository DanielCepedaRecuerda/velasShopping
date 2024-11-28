window.onload = function() {
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

  // Si la cookie del carrito existe, mostrar el carrito
  if (cartCookie && carritoElement) {
    carritoElement.style.display = 'block';  // Muestra el carrito
  } else if (carritoElement) {
    carritoElement.style.display = 'none';  // Asegúrate de que esté oculto si no existe la cookie
  }

   // Verificar si la cookie 'user_authenticated' está presente
   const usercookie = getCookie('user_authenticated');
   const divBotonAcceso = document.getElementById('divBotonAcceso');
 
   if (!divBotonAcceso) return;

  if (usercookie) {
    divBotonAcceso.classList.remove('show');  // Ocultar el botón si el usuario está logueado
  } else {
    divBotonAcceso.classList.add('show');  // Mostrar el botón si no está logueado
  }
};
