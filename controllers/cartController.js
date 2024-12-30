const productsModel = require("../models/productsModel");

const getCart = (req, res) => {
  const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  console.log(cart);
  
  res.render('cart', { cart });
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity, redirectUrl } = req.body;
    const parsedQuantity = Number(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.redirect(`/productos?error=${encodeURIComponent("Cantidad inválida.")}`);
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
    res.redirect(redirectUrl);
  } catch (err) {
    console.error("Error en addToCart:", err);
    res.status(500).json({ error: "Error al verificar el producto." });
  }
};

const removeFromCart = (req, res) => {
  const productId = req.params.productId;
  let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío." });
  }
  
  const updatedCart = cart.filter((item) => item.productId !== Number(productId));

  if (updatedCart.length === cart.length) {
      return res.status(404).json({ error: "Producto no encontrado en el carrito." });
  }

  res.cookie("cart", JSON.stringify(updatedCart), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
  });
  res.status(200).json(updatedCart);
};

const updateCartQuantity = (req, res) => {
  const { productId, action } = req.body;
  let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

  // Buscar el producto en el carrito
  const itemIndex = cart.findIndex(item => item.productId === Number(productId));

  if (itemIndex > -1) {
    if (action === 'increase') {
      cart[itemIndex].quantity += 1; // Incrementar la cantidad
    } else if (action === 'decrease') {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity -= 1; // Decrementar la cantidad
      } else {
        cart.splice(itemIndex, 1); // Eliminar el producto si la cantidad es 0
      }
    }
  }

  // Guardar el carrito actualizado en la cookie
  res.cookie("cart", JSON.stringify(cart), {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
  });

  res.status(200).json(cart); // Devolver el carrito actualizado
};

module.exports = { getCart, addToCart, removeFromCart, updateCartQuantity };