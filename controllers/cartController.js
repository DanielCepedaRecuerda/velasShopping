const productsModel = require("../models/productsModel");

const getCart = (req, res) => {
  const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  res.render('cart', { cart });
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const parsedQuantity = Number(quantity);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ error: "Cantidad inválida." });
    }

    // Obtener el producto de la base de datos
    const product = await productsModel.getProductById(Number(productId));
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    // Obtener el carrito de la cookie
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    // Buscar si el producto ya existe en el carrito
    const itemIndex = cart.findIndex(
      (item) => Number(item.productId) === Number(productId)
    );

    // Si el producto ya está en el carrito, se actualiza la cantidad
    if (itemIndex > -1) {
      cart[itemIndex].quantity += parsedQuantity;
    } else {
      // Si el producto no está en el carrito, se agrega con los detalles
      cart.push({
        productId: Number(productId),
        quantity: parsedQuantity,
        name: product.nombre,
        price: parseFloat(product.precio) 
      });
    }

    // Guardar el carrito actualizado en la cookie
    res.cookie("cart", JSON.stringify(cart), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
    });

    // Redirigir a la página de productos
    res.redirect("/productos");
  } catch (err) {
    console.error("Error en addToCart:", err);
    res.status(500).json({ error: "Error al verificar el producto." });
    res.redirect("/productos");
  }
};

const removeFromCart = (req, res) => {
  const productId = req.params.productId;
  let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

  if (cart.length === 0) {
    return res.status(400).json({ error: "El carrito está vacío." });
  }

  // Filtrar el carrito para eliminar el producto
  const updatedCart = cart.filter((item) => item.productId !== Number(productId));

  // Si no se ha eliminado ningún producto, devolver un mensaje de error
  if (updatedCart.length === cart.length) {
    return res.status(404).json({ error: "Producto no encontrado en el carrito." });
  }

  // Guardar el carrito actualizado en la cookie
  res.cookie("cart", JSON.stringify(updatedCart), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Asegurarse de que sea seguro en producción
    sameSite: "strict"
  });

  // Responder con el carrito actualizado
  res.status(200).json(updatedCart);
};

module.exports = { getCart, addToCart, removeFromCart };
