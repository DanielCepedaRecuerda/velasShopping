const connection = require("../db/connection");

const insertarPedido = (idCliente, total) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO pedido (fecha_hora, total, id_cliente) VALUES (NOW(), ?, ?)",
      [total, idCliente],
      (err, result) => {
        if (err) {
          console.error("Error al insertar pedido:", err);
          reject(err);
        } else {
          console.log("Pedido insertado con éxito, ID:", result.insertId);
          resolve(result.insertId); // Devuelve el id del nuevo pedido
        }
      }
    );
  });
};

const insertarProductosPedidos = (idPedido, productos) => {
  return new Promise((resolve, reject) => {
    const queries = productos.map((producto) => {
      return new Promise((resolve, reject) => {
        connection.query(
          "INSERT INTO productos_pedidos (id_pedido, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)",
          [idPedido, producto.id_producto, producto.cantidad, producto.precio],
          (err, result) => {
            if (err) {
              console.error("Error al insertar producto en el pedido:", err);
              reject(err);
            } else {
              console.log("Producto insertado con éxito en el pedido.");
              resolve(result);
            }
          }
        );
      });
    });

    Promise.all(queries).then((results) => {
      console.log("Todos los productos insertados con éxito en el pedido.");
      resolve(results);
    }).catch((err) => {
      console.error("Error al insertar productos en el pedido:", err);
      reject(err);
    });
  });
};

const insertarDireccion = async (idCliente, direccionData) => {
  try {
    const conn = await connection();
    const [result] = await conn.query(
      "SELECT * FROM direcciones WHERE id_cliente = ? AND dirección = ? AND cod_postal = ? AND ciudad = ? AND provincia = ? AND país = ?",
      [
        idCliente,
        direccionData.direccion,
        direccionData.cod_postal,
        direccionData.ciudad,
        direccionData.provincia,
        direccionData.pais,
      ]
    );
    await conn.end();

    if (result.length > 0) {
      // Si la dirección ya existe, no hacer nada o retornar la dirección existente
      console.log("La dirección ya está registrada.");
      return result[0]; // Devuelve la dirección existente
    } else {
      // Si no existe, insertamos la nueva dirección
      const conn = await connection();
      const [result] = await conn.query(
        "INSERT INTO direcciones (direccion, numero, piso, puerta, cod_postal, ciudad, provincia, pais, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          direccionData.direccion,
          direccionData.numero,
          direccionData.piso,
          direccionData.puerta,
          direccionData.cod_postal,
          direccionData.ciudad,
          direccionData.provincia,
          direccionData.pais,
          idCliente,
        ]
      );
      await conn.end();
      console.log("Dirección insertada con éxito.");
      return result;
    }
  } catch (err) {
    console.error("Error al insertar dirección:", err);
    throw err;
  }
};


const procesarPago = (idCliente, productos, direccionData, total) => {
  connection.beginTransaction((err) => {
    if (err) {
      throw err;
    }
    // 1. Insertar el pedido
    insertarPedido(idCliente, total, (idPedido) => {
      // 2. Insertar los productos en el pedido
      insertarProductosPedidos(idPedido, productos);

      // 3. Insertar la dirección
      insertarDireccion(idCliente, direccionData);
      connection.commit((err) => {
        if (err) {
          connection.rollback(() => {
            console.error("Error en la transacción. Se ha revertido.");
          });
        } else {
          console.log("Transacción completada con éxito.");
        }
      });
    });
  });
};

module.exports = {procesarPago, insertarPedido ,insertarDireccion, insertarProductosPedidos};
