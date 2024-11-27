const productsModel = require("../models/productsModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await productsModel.getAllProducts(); // Llamada al modelo
    res.json(products); // Responder con los datos en formato JSON
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" }); // Manejo de errores
  }
};

  module.exports = { getAllProducts };