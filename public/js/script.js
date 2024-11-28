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

    // Si la cookie del carrito existe, quitar la clase 'hidden' (o la clase que necesites)
    const carritoElement = document.getElementById("carrito-element");
    if (cartCookie && carritoElement) {
        carritoElement.classList.remove("hidden");  // Quitar la clase 'hidden' del carrito
    }

   // Verificar si la cookie 'user_authenticated' está presente
   const usercookie = getCookie('user_authenticated');
   const divBotonAcceso = document.getElementById('divBotonAcceso');
 
   if (usercookie && divBotonAcceso) {
     // Ocultar el div si la cookie indica que el usuario está logueado
     divBotonAcceso.classList.add('hidden');
     divBotonAcceso.classList.remove('divBotonAcceso');
   } else if (divBotonAcceso) {
     // Mostrar el div si no está logueado
     divBotonAcceso.classList.remove('hidden');
     divBotonAcceso.classList.add('divBotonAcceso');
   }
};
