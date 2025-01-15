const {
  insertarPedido,
  insertarProductosPedidos,
  insertarDireccion,
} = require("../models/paymentModel"); // Asegúrate de tener las funciones correctamente exportadas

const paymentController = async (req, res) => {
  try {
    // Recuperar datos del formulario
    const { numeroTarjeta, nombreTitular, fechaExpiracion, cvv } = req.body;
    // Obtener el id_cliente desde la sesión
    const idCliente = req.cookies.userId;

    // Recuperar los datos del carrito desde la cookie
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    // Recuperar los datos del formulario desde la cookie
    const formularioDatos = req.cookies.formularioDatos
      ? JSON.parse(req.cookies.formularioDatos)
      : null;
    // Recuperar la informacion de envío
    const {
      nombre,
      direccion,
      numero,
      piso,
      puerta,
      ciudad,
      codigoPostal,
      provincia,
      pais,
    } = formularioDatos;

    // Verificar si faltan datos
    if (!cart || !formularioDatos) {
      return res.status(400).json({
        success: false,
        error: "Faltan datos del carrito o formulario.",
      });
    }

    // Validación de datos del formulario
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

    // Pasar los valores separados
    const direccionData = {
      direccion: direccion,
      numero: numero,
      piso: piso,
      puerta: puerta,
      ciudad: ciudad,
      codigoPostal: codigoPostal,
      provincia: provincia,
      pais: pais,
    };

    await insertarDireccion(idCliente, direccionData);
    // Calcular el total del pedido
    const total = cart.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    ); // Calculamos el total del pedido
    console.log("total: ", total);

    // Insertar el pedido
    const idPedido = await insertarPedido(idCliente, total);

    // Insertar los productos del pedido
    await insertarProductosPedidos(idPedido, cart);

    // Responder con éxito
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
    message: "Tu pago se procesó exitosamente.",
    cartItems: cart,
    formularioDatos: formularioDatos,
  });
};

module.exports = { paymentController, confirmation };
