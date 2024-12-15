const getAllProducts = async (req, res) => {
  try {
    const products = await productsModel.getAllProducts();
    res.json(products); // Responder en formato JSON
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

  module.exports = { getAllProducts };