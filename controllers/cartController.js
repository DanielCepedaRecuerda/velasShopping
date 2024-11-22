const Product = require('../models/Product');

const getCart = (req, res) => {
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    res.json(cart);
};
  
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

   // Validar que los datos sean correctos
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Datos inválidos: asegúrate de enviar productId y una cantidad mayor que 0.' });
    }
  
    // Verificar si el producto existe
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
      }
  
      let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
      const itemIndex = cart.findIndex(item => item.productId === productId);
  
      if (itemIndex > -1) {
        cart[itemIndex].quantity += quantity;
      } else {
        cart.push({ productId, quantity });
      }
  
    res.cookie('cart', JSON.stringify(cart), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Solo usa secure en producción
        sameSite: 'strict', // Restringe la cookie al mismo dominio
    }); 
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: 'Error al verificar el producto.' });
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
  