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

    // Verificar si el usuario ha iniciado sesión
    const usercookie = getCookie("user");

    // Seleccionar el botón de acceso
    const divBotonAcceso = document.getElementById("divBotonAcceso");

    // Si el usuario está logueado, añadir la clase 'hidden' al botón de acceso, de lo contrario quitarla
    if (usercookie && divBotonAcceso) {
        divBotonAcceso.classList.add("hidden");  // Añadir la clase 'hidden' si está logueado
    } else if (divBotonAcceso) {
        divBotonAcceso.classList.remove("hidden");  // Quitar la clase 'hidden' si no está logueado
    }
};
