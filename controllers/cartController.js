const productsModel = require("../models/productsModel");

const getCart = (req, res) => {
  const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  res.json(cart);
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const parsedQuantity = Number(quantity);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ error: "Cantidad inválida." });
    }

    const product = await productsModel.getProductById(Number(productId));
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    const itemIndex = cart.findIndex(
      (item) => Number(item.productId) === Number(productId)
    );

    if (itemIndex > -1) {
      cart[itemIndex].quantity += parsedQuantity;
    } else {
      cart.push({ productId: Number(productId), quantity: parsedQuantity });
    }

    res.cookie("cart", JSON.stringify(cart), {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    
    res.redirect("/productos");
    return res.status(200).json({ cart });
  } catch (err) {
    console.error("Error en addToCart:", err);
    res.status(500).json({ error: "Error al verificar el producto." });
  }
};

const removeFromCart = (req, res) => {
  const productId = req.params.productId;
  let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

  cart = cart.filter((item) => item.productId !== productId);

  res.cookie("cart", JSON.stringify(cart), { httpOnly: true });
  res.status(200).json(cart);
};

module.exports = { getCart, addToCart, removeFromCart };
