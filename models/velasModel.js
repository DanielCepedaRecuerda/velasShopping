const connection = require("../db/connection");

// Crear un nuevo producto (vela)
const createVela = async (velaData) => {
  const { nombre, precio, stock, id_categoria, id_proveedor } = velaData;

  const conn = await connection();

  try {
    // Insertamos el nuevo producto (vela)
    const query =
      "INSERT INTO productos (nombre, precio, stock, id_categoria, id_proveedor) VALUES (?, ?, ?, ?, ?)";

    await conn.execute(query, [
      nombre,
      precio,
      stock,
      id_categoria,
      id_proveedor,
    ]);
  } catch (error) {
    throw new Error(`Error al crear la vela: ${error.message}`);
  } finally {
    conn.end(); // Cerrar la conexión
  }
};

// Buscar una vela por su id
const findVelaById = async (id) => {
  const query = "SELECT * FROM productos WHERE id = ?";
  const conn = await connection();

  try {
    const [rows] = await conn.execute(query, [id]);

    if (rows.length === 0) {
      return null; // Si no se encuentra la vela
    }
    return rows[0]; // Devuelve la vela encontrada
  } catch (error) {
    throw new Error(`Error al buscar la vela: ${error.message}`);
  } finally {
    conn.end(); // Cerrar la conexión
  }
};

// Buscar velas por categoría
const findVelasByCategoria = async (categoriaId) => {
  const query = "SELECT * FROM productos WHERE id_categoria = ?";
  const conn = await connection();

  try {
    const [rows] = await conn.execute(query, [categoriaId]);

    if (rows.length === 0) {
      return []; // Si no se encuentran velas en esa categoría
    }
    return rows; // Devuelve todas las velas encontradas en la categoría
  } catch (error) {
    throw new Error(`Error al buscar las velas en la categoría: ${error.message}`);
  } finally {
    conn.end(); // Cerrar la conexión
  }
};

// Actualizar la información de una vela
const updateVela = async (id, velaData) => {
  const { nombre, precio, stock, id_categoria, id_proveedor } = velaData;

  const conn = await connection();

  try {
    const query =
      "UPDATE productos SET nombre = ?, precio = ?, stock = ?, id_categoria = ?, id_proveedor = ? WHERE id = ?";

    await conn.execute(query, [
      nombre,
      precio,
      stock,
      id_categoria,
      id_proveedor,
      id,
    ]);
  } catch (error) {
    throw new Error(`Error al actualizar la vela: ${error.message}`);
  } finally {
    conn.end(); // Cerrar la conexión
  }
};

// Eliminar una vela
const deleteVela = async (id) => {
  const query = "DELETE FROM productos WHERE id = ?";
  const conn = await connection();

  try {
    await conn.execute(query, [id]);
  } catch (error) {
    throw new Error(`Error al eliminar la vela: ${error.message}`);
  } finally {
    conn.end(); // Cerrar la conexión
  }
};

module.exports = {
    findVelasByCategoria
};
