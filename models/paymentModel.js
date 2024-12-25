const connection = require("../db/connection");
// Crear un nuevo pedido
const createPedido = async (fechaHora, total, idCliente) => {
  const [result] = await connection().execute(
    "INSERT INTO pedidos (fecha_hora, total, id_cliente) VALUES (?, ?, ?)",
    [fechaHora, total, idCliente]
  );
  return result.insertId; // Devuelve el ID del pedido recién creado
};

// Agregar productos al pedido
const addProductsToOrder = async (idPedido, cartItems) => {
  const values = cartItems.map(item => [
    item.cantidad,
    item.precio,
    idPedido,
    item.id_producto
  ]);
  await connection().execute(
    "INSERT INTO productos_pedidos (cantidad, precio, id_pedido, id_producto) VALUES ?",
    [values]
  );
};

// Actualizar el stock de los productos
const updateProductStock = async (idProducto, cantidad) => {
  await connection().execute(
    "UPDATE productos SET stock = stock - ? WHERE id = ?",
    [cantidad, idProducto]
  );
};

module.exports = { createPedido, addProductsToOrder, updateProductStock };
