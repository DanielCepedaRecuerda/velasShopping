const connection = require("../db/connection");
console.log(connection);
const insertarPedido = async (idCliente, total) => {
  const conn = await connection();
  const query =
    "INSERT INTO pedido (fecha_hora, total, id_cliente) VALUES (NOW(), ?, ?)";
  const [result] = await conn.execute(query, [total, idCliente]);
  await conn.end();
  return result.insertId;
};

const insertarProductosPedidos = async (idPedido, productos, conn) => {
  console.log("entro en insertarProductosPedidos ", idPedido, productos);

  const queries = productos.map(async (producto) => {
    try {
      await conn.execute(
        "INSERT INTO productos_pedidos (id_pedido, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)",
        [idPedido, producto.id_producto, producto.cantidad, producto.precio]
      );
    } catch (error) {
      console.error("Error al insertar producto:", producto, error);
      throw error; // Lanza el error para detener toda la transacción
    }
  });

  await Promise.all(queries);
};

const insertarDireccion = async (idCliente, direccionData) => {
  console.log("entro en insertarDireccion ".idCliente, direccionData);

  const conn = await connection();
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
    const [result] = await conn.execute(
      "INSERT INTO pedido (fecha_hora, total, id_cliente) VALUES (NOW(), ?, ?)",
      [total, idCliente]
    );
    const idPedido = result.insertId;

    // 2. Insertar los productos en el pedido
    await insertarProductosPedidos(idPedido, productos, conn);

    // 3. Insertar la dirección
    await insertarDireccion(idCliente, direccionData, conn);

    await conn.commit();
    console.log("Transacción completada con éxito.");
  } catch (err) {
    await conn.rollback();
    console.error("Error en la transacción. Se ha revertido.");
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
