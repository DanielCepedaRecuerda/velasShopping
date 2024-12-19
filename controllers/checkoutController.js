const Cart = require('../models/cartModel'); // Asegúrate de tener un modelo de carrito

// Middleware de autenticación
exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next(); // El usuario está autenticado, continuar
    } else {
        res.redirect('/login'); // Redirigir a la página de inicio de sesión
    }
};

// Mostrar la vista de checkout
exports.showCheckout = (req, res) => {
    // Obtener el carrito de la sesión
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    // Verificar si el carrito tiene elementos
    if (cart.length === 0) {
        return res.redirect('/productos'); // Redirigir si el carrito está vacío
    }

    // Renderizar la vista de checkout con el carrito
    res.render('checkout', { cart });
};

// Procesar el formulario de checkout
exports.processCheckout = (req, res) => {
    const { nombre, direccion, ciudad, codigoPostal, telefono } = req.body;
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    // Aquí puedes agregar la lógica para procesar el pedido, como guardarlo en la base de datos
    // Por ejemplo, podrías crear un pedido en la base de datos

    // Simulación de procesamiento del pedido
    console.log('Pedido procesado:', {
        nombre,
        direccion,
        ciudad,
        codigoPostal,
        telefono,
        cart,
    });

    // Limpiar el carrito después de procesar el pedido
    req.session.cart = []; // Vaciar el carrito

    // Redirigir a una página de confirmación o mostrar un mensaje de éxito
    res.redirect('/confirmation'); // Redirigir a una página de confirmación
};