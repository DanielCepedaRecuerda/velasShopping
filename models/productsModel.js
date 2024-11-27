const connection = require("../db/connection");

// Función para obtener todos los productos
const getAllProducts = async () => {
  const conn = await connection(); // Obtener la conexión a la base de datos
  const [rows] = await conn.query("SELECT * FROM productos"); // Ejecutar la consulta
  return rows; // Retornar los resultados como un array
};

// Función para obtener un producto por su ID.
const getProductById = async (productId) => {
  try {
    const conn = await connection();
    const [product] = await conn.execute(
      "SELECT * FROM productos WHERE id = ?",
      [productId]
    );
    return product.length > 0 ? product[0] : null;
  } catch (err) {
    throw new Error("Error fetching product");
  }

};

module.exports = { getAllProducts, getProductById };
