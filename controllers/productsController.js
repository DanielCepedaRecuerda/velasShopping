// controllers/productsController.js
const productsModel = require('../models/productsModel'); // Asegúrate de importar tu modelo

const getAllProducts = async (req, res) => {
  try {
    const products = await productsModel.getAllProducts(); // Obtener todos los productos
    const redirectUrl = req.query.redirectUrl;

    // Renderizar la vista y pasar los productos y la URL de redirección
    res.render('productos', { products, redirectUrl });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

module.exports = { getAllProducts };