const connection = require("../db/connection");

const insertarPedido = async (idCliente, total) => {
  console.log("Intentando conectarse al pool...");
  const conn = await connection();
  console.log("Conexión establecida con éxito.");
  const query =
    "INSERT INTO pedido (fecha_hora, total, id_cliente) VALUES (NOW(), ?, ?)";
  const [result] = await conn.execute(query, [total, idCliente]);
  return result.insertId;
};

const insertarProductosPedidos = async (idPedido, productos, conn) => {
  for (const producto of productos) {
    await conn.execute(
      "INSERT INTO productos_pedidos (id_pedido, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)",
      [idPedido, producto.id_producto, producto.cantidad, producto.precio]
    );
  }
};

const insertarDireccion = async (idCliente, direccionData, conn) => {
  if (!conn) {
    throw new Error("Conexión no inicializada.");
  }
  const query =
    "INSERT INTO direcciones (dirección, numero, piso, puerta, cod_postal, ciudad, provincia, país, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  await conn.execute(query, [
    direccionData.direccion,
    direccionData.numero || 0,
    direccionData.piso || 0,
    direccionData.puerta || "",
    direccionData.codigoPostal || 0,
    direccionData.ciudad || "",
    direccionData.provincia || "",
    direccionData.pais || "",
    idCliente,
  ]);
};

const procesarPago = async (idCliente, productos, direccionData, total) => {
  const conn = await connection();
  await conn.beginTransaction();

  try {
    // 1. Insertar el pedido
    const idPedido = await insertarPedido(idCliente, total, conn);

    // 2. Insertar los productos en el pedido
    await insertarProductosPedidos(idPedido, productos, conn);

    // 3. Insertar la dirección
    await insertarDireccion(idCliente, direccionData, conn);

    // Confirmar la transacción
    await conn.commit();
    console.log("Transacción completada con éxito.");
  } catch (err) {
    await conn.rollback();
    console.error("Error en la transacción. Se ha revertido:", err);
    throw err;
  } finally {
    await conn.end();
  }
};

module.exports = {
  procesarPago,
  insertarPedido,
  insertarDireccion,
  insertarProductosPedidos,
};
