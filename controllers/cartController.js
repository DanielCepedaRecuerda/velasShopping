const Product = require('../models/productsModel');

const getCart = (req, res) => {
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    res.json(cart);
};
  
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  // Validar los parámetros
  if (!productId || !Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ error: 'Datos inválidos: asegúrate de enviar productId y una cantidad mayor que 0.' });
  }

  try {
    // Verificar si el producto existe
    const product = await Product.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    // Obtener el carrito de la cookie (si existe)
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    // Verificar si el producto ya está en el carrito
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
      // Si el producto ya existe en el carrito, actualizar la cantidad
      cart[itemIndex].quantity += quantity;
    } else {
      // Si no existe, agregar un nuevo producto al carrito
      cart.push({ productId, quantity });
    }

    // Guardar el carrito actualizado en las cookies
    res.cookie('cart', JSON.stringify(cart), {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === 'production', // Solo en producción
      sameSite: 'strict', // Mejor control de cookies
    });

    // Responder con el carrito actualizado
    res.status(200).json({ cart });
  } catch (err) {
    // Registrar el error en el servidor para depuración
    console.error('Error al agregar al carrito:', err);

    // Responder con un mensaje genérico, pero útil para el cliente
    res.status(500).json({ error: 'Error al verificar el producto. Intenta nuevamente más tarde.' });
  }
};
  
const removeFromCart = (req, res) => {
    const productId = req.params.productId;
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  
    cart = cart.filter(item => item.productId !== productId);
  
    res.cookie('cart', JSON.stringify(cart), { httpOnly: true });
    res.status(200).json(cart);
};

  
module.exports = { getCart, addToCart, removeFromCart };
  