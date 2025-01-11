const {
  insertarPedido,
  insertarProductosPedidos,
  insertarDireccion,
} = require("../models/paymentModel"); // Asegúrate de tener las funciones correctamente exportadas

const paymentController = async (req, res) => {
  try {
    console.log("Cookies recibidas:", req.cookies); // Verifica si llega la cookie de sesión
    console.log("Sesión en el servidor:", req.session); // Verifica qué datos tiene la sesión

    if (!req.session.user || !req.session.user.id) {
      return res.status(401).json({
        success: false,
        error: "No estás autenticado. Por favor, inicia sesión.",
      });
    }

    // Obtener el id_cliente desde la sesión
    const idCliente = req.session.user.id;

    // Recuperar los datos del carrito desde la cookie
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    console.log("Cart: ", cart);

    // Recuperar los datos del formulario desde la cookie
    const formularioDatos = req.cookies.formularioDatos
      ? JSON.parse(req.cookies.formularioDatos)
      : null;

    // Verificar si faltan datos
    if (!cart || !formularioDatos) {
      return res.status(400).json({
        success: false,
        error: "Faltan datos del carrito o formulario.",
      });
    }

    // Validación de datos del formulario (aunque esto ya lo controlas previamente)
    const { direccion, numeroTarjeta, nombreTitular, fechaExpiracion, cvv } =
      formularioDatos;
    if (
      !direccion ||
      !numeroTarjeta ||
      !nombreTitular ||
      !fechaExpiracion ||
      !cvv
    ) {
      return res.status(400).json({
        success: false,
        error: "Faltan datos en el formulario de pago.",
      });
    }

    // 1. Insertar o actualizar la dirección
    await insertarDireccion(idCliente, direccion);

    // 2. Calcular el total del pedido
    const total = cart.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    ); // Calculamos el total del pedido

    // 3. Insertar el pedido
    const idPedido = await insertarPedido(idCliente, total);

    // 4. Insertar los productos del pedido
    await insertarProductosPedidos(idPedido, cart);

    // 5. Responder con éxito
    res.status(200).json({
      success: true,
      message: "Pago procesado correctamente. Redirigiendo a la confirmación.",
      cartItems: cart,
    });
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    res.status(500).json({
      success: false,
      error:
        "Ocurrió un error al procesar el pago. Inténtalo de nuevo más tarde.",
    });
  }
};

const confirmation = (req, res) => {
  const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  const formularioDatos = req.cookies.formularioDatos
    ? JSON.parse(req.cookies.formularioDatos)
    : null;

  res.clearCookie("cart");
  res.clearCookie("formularioDatos");

  res.render("confirmation", {
    message: "Gracias por tu compra. Tu pago se procesó exitosamente.",
    cartItems: cart,
    formularioDatos: formularioDatos,
  });
};

module.exports = { paymentController, confirmation };
