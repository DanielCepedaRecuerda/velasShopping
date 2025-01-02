const connection = require("../db/connection");

const createPedido = async (fechaHora, total, idCliente) => {
  const connectionInstance = await connection();
  try {
    // Iniciar transacción
    await connectionInstance.beginTransaction();

    // Crear pedido
    const [result] = await connectionInstance.execute(
      "INSERT INTO pedidos (fecha_hora, total, id_cliente) VALUES (?, ?, ?)",
      [fechaHora, total, idCliente]
    );
    const idPedido = result.insertId;

    // Agregar productos al pedido
    const values = cartItems.map((item) => [
      item.cantidad,
      item.precio,
      idPedido,
      item.id_producto,
    ]);
    await connectionInstance.execute(
      "INSERT INTO productos_pedidos (cantidad, precio, id_pedido, id_producto) VALUES ?",
      [values]
    );

    // Actualizar stock de productos
    for (let item of cartItems) {
      await connectionInstance.execute(
        "UPDATE productos SET stock = stock - ? WHERE id = ?",
        [item.cantidad, item.id_producto]
      );
    }

    // Commit de la transacción
    await connectionInstance.commit();

    return idPedido;
  } catch (error) {
    // Revertir en caso de error
    await connectionInstance.rollback();
    throw error;
  } finally {
    // Cerrar Conexción
    connectionInstance.release();
  }
};

// Agregar productos al pedido
const addProductsToOrder = async (idPedido, cartItems) => {
  const connectionInstance = await connection();
  try {
    // Verificar si los productos existen y tienen stock suficiente
    for (let item of cartItems) {
      const [product] = await connectionInstance.execute(
        "SELECT stock FROM productos WHERE id = ?",
        [item.id_producto]
      );

      if (!product || product.length === 0) {
        throw new Error(`El producto con ID ${item.id_producto} no existe.`);
      }

      const productStock = product[0].stock;
      if (productStock < item.cantidad) {
        throw new Error(
          `No hay suficiente stock para el producto ${item.id_producto}.`
        );
      }
    }

    // Insertar productos en la tabla de productos_pedidos
    const values = cartItems.map((item) => [
      item.cantidad,
      item.precio,
      idPedido,
      item.id_producto,
    ]);
    await connectionInstance.execute(
      "INSERT INTO productos_pedidos (cantidad, precio, id_pedido, id_producto) VALUES ?",
      [values]
    );
  } catch (error) {
    console.error("Error al agregar productos al pedido:", error);
    throw error; // Lanzar el error para que se maneje por el controlador
  } finally {
    connectionInstance.release();
  }
};

// Actualizar el stock de los productos
const updateProductStock = async (cartItems) => {
  const connectionInstance = await connection();
  try {
    // Actualizar el stock de cada producto
    for (let item of cartItems) {
      const [product] = await connectionInstance.execute(
        "SELECT stock FROM productos WHERE id = ?",
        [item.id_producto]
      );

      if (!product || product.length === 0) {
        throw new Error(`El producto con ID ${item.id_producto} no existe.`);
      }

      const productStock = product[0].stock;
      if (productStock < item.cantidad) {
        throw new Error(
          `No hay suficiente stock para el producto ${item.id_producto}.`
        );
      }

      // Actualizar el stock en la base de datos
      await connectionInstance.execute(
        "UPDATE productos SET stock = stock - ? WHERE id = ?",
        [item.cantidad, item.id_producto]
      );
    }
  } catch (error) {
    console.error("Error al actualizar el stock de los productos:", error);
    throw error;
  } finally {
    connectionInstance.release();
  }
};

module.exports = { createPedido, addProductsToOrder, updateProductStock };
