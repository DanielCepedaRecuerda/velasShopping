const connection = require("../db/connection");

// Función para obtener todos los productos
const getAllProducts = async () => {
  try {
    const conn = await connection();
    const [rows] = await conn.query("SELECT * FROM productos");
    await conn.end();
    // Retorna los productos obtenidos
    return rows;
  } catch (err) {
    console.error("Error al obtener todos los productos:", err);
    throw new Error("No se pudo obtener la lista de productos");
  }
};

// Función para obtener un producto por su ID
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
      return null; // Si no se encuentra el producto
    }
    return product[0]; // Retorna el producto
  } catch (err) {
    console.error("Error al obtener el producto:", err);
    throw new Error("Error al obtener el producto");
  }
};

// Función para obtener productos por categoría
const getProductsByCategory = async (category) => {
  try {
    const conn = await connection();
    const [rows] = await conn.execute(
      "SELECT * FROM productos WHERE categoria = ?",
      [category]
    );
    await conn.end();
    return rows; // Retorna los productos de la categoría
  } catch (err) {
    console.error("Error al obtener productos por categoría:", err);
    throw new Error("Error al obtener productos por categoría");
  }
};

module.exports = { getAllProducts, getProductById, getProductsByCategory };
