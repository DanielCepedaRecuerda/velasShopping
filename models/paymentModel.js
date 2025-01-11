const connection = require("../db/connection");
const insertarPedido = async (idCliente, total) => {
  console.log("entro en insertarPedido ", idCliente, total);
  const conn = await connection();
  const query =
    "INSERT INTO pedido (fecha_hora, total, id_cliente) VALUES (NOW(), ?, ?)";
  const [result] = await conn.execute(query, [total, idCliente]);
  await conn.end();
  return result.insertId;
};

const insertarProductosPedidos = async (idPedido, productos, conn) => {
  const conn = await connection();
  console.log("id del pedido: ", idPedido);
  console.log("Insertando productos:", productos);
  console.log("conn", conn);

  for (const producto of productos) {
    try {
      await conn.execute(
        "INSERT INTO productos_pedidos (id_pedido, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)",
        [idPedido, producto.id_producto, producto.cantidad, producto.precio]
      );
    } catch (error) {
      console.error("Error al insertar producto:", error.message);
      throw error; // Lanza el error para detener toda la transacción
    }
  }
  await conn.end();
};

const insertarDireccion = async (idCliente, direccionData) => {
  console.log("entro en insertarDireccion ", idCliente, direccionData);

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
  await conn.end();
};

const procesarPago = async (idCliente, productos, direccionData, total) => {
  const conn = await connection();
  await conn.beginTransaction();

  try {
    // Insertar el pedido
    const idPedido = await insertarPedido(idCliente, total, conn);

    // Insertar los productos
    await insertarProductosPedidos(idPedido, productos, conn);

    // Insertar la dirección
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
