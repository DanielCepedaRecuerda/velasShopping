const getProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  };

  module.exports = { getProducts };