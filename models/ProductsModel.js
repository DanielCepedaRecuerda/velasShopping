const connection = require("../db/connection");

// Función para obtener todos los productos
const getAllProducts = async () => {
  const conn = await connection();
  const [rows] = await conn.query("SELECT * FROM productos");
  return rows;
};

// Función para obtener un producto por su ID
const getProductById = async (productId) => {
  try {
    const conn = await connection();
    const [product] = await conn.execute('SELECT * FROM productos WHERE id = ?', [productId]);
    console.log('Product found:', product); // Log the result to debug
    return product.length > 0 ? product[0] : null;
  } catch (err) {
    console.error('Error fetching product:', err); // Log any error
    throw new Error('Error fetching product');
  }
};

module.exports = { getAllProducts, getProductById };
