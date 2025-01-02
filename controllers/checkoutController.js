const Cart = require("../models/cartModel");

// Middleware de autenticación
exports.isAuthenticated = (req, res, next) => {
  // Verificar si la cookie de autenticación está presente
  if (req.cookies.user_authenticated) {
    console.log("Usuario autenticado");
    next(); // El usuario está autenticado, continuar
  } else {
    console.log("Redirigiendo a login...");
    res.redirect("/login"); // Redirigir a la página de inicio de sesión
  }
};

// Mostrar la vista de checkout
exports.showCheckout = (req, res) => {
  // Obtener el carrito de la sesión
  const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  if (cart.length === 0) {
    return res.redirect("/productos"); // Redirigir si el carrito está vacío
  }

  // Renderizar la vista de checkout con el carrito
  res.render("checkout", { cart });
};

// Procesar el formulario de checkout
exports.processCheckout = (req, res) => {
  const { nombre, direccion, ciudad, codigoPostal, telefono } = req.body;
  const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

  // Aquí puedes agregar la lógica para procesar el pedido

  console.log("Pedido procesado:", {
    nombre,
    direccion,
    ciudad,
    codigoPostal,
    telefono,
    cart,
  });

  // Limpiar el carrito después de procesar el pedido
  req.session.cart = [];

  res.redirect("/confirmation"); // Redirigir a una página de confirmación
};
