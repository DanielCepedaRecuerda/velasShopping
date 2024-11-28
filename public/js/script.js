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
    if (cartCookie) {
        // Seleccionamos el elemento del cual queremos quitar la clase
        const element = document.getElementById("carrito-element"); // Cambia "carrito-element" por el ID real de tu elemento

        if (element) {
            element.classList.remove("hidden");  // Cambia "hidden" por la clase que quieres quitar
        }
    }

    // Verificar si el usuario ha iniciado sesión
    const usercookie = getCookie("user");
     // Si la cookie del carrito existe, quitar la clase 'hidden' (o la clase que necesites)
     const element = document.getElementById("divBotonAcceso"); // Cambia "carrito-element" por el ID real de tu elemento

     if (usercookie) {
        // Seleccionamos el elemento del cual queremos quitar la clase

        if (element) {
            element.classList.remove("hidden");  // Cambia "hidden" por la clase que quieres quitar
        }
    }
    else{
        if (element) {
            element.classList.add("show");  // Cambia "hidden" por la clase que quieres quitar
        }
    }
};
