const connection = require("../db/connection");

// Función para obtener todos los productos
const getAllProducts = async () => {
  const conn = await connection();
  const [rows] = await conn.query("SELECT * FROM productos");
  await conn.end();
  return rows; // Retornar como array
};

const getProductById = async (productId) => {
  if (isNaN(productId)) {
    throw new Error("El ID del producto no es válido");
  }
  try {
    const conn = await connection();
    const [product] = await conn.execute(
      "SELECT * FROM productos WHERE id = ?",
      [productId]
    );
    await conn.end();
    
    if (product.length === 0) {
      return null;
    }
    return product[0];
  } catch (err) {
    console.error("Error fetching product:", err);
    throw new Error("Error al obtener el producto");
  }
};

module.exports = { getAllProducts, getProductById };
