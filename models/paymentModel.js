const connection = require("../db/connection");

const insertarPedido = (idCliente, total) => {
  const query = `INSERT INTO pedido (fecha_hora, total, id_cliente) VALUES (NOW(), ?, ?)`;
  connection.execute(query, [total, idCliente], (err, result) => {
    if (err) {
      console.error("Error al insertar pedido:", err);
      return;
    }
    console.log("Pedido insertado con éxito, ID:", result.insertId);
    return result.insertId; // Devuelve el id del nuevo pedido
  });
};

const insertarProductosPedidos = (idPedido, productos) => {
  productos.forEach((producto) => {
    const query = `INSERT INTO productos_pedidos (id_pedido, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)`;
    connection.execute(
      query,
      [idPedido, producto.id_producto, producto.cantidad, producto.precio],
      (err, result) => {
        if (err) {
          console.error("Error al insertar productos en el pedido:", err);
          return;
        }
        console.log("Producto insertado con éxito en el pedido.");
      }
    );
  });
};

const insertarDireccion = (idCliente, direccionData) => {
  return new Promise((resolve, reject) => {
    // Verificar si el cliente ya tiene una dirección similar (por ejemplo, misma ciudad, código postal y dirección)
    const queryCheck = `SELECT * FROM direcciones WHERE id_cliente = ? AND dirección = ? AND cod_postal = ? AND ciudad = ? AND provincia = ? AND país = ?`;
    connection.execute(
      queryCheck,
      [
        idCliente,
        direccionData.dirección,
        direccionData.cod_postal,
        direccionData.ciudad,
        direccionData.provincia,
        direccionData.país
      ],
      (err, result) => {
        if (err) {
          console.error("Error al verificar dirección existente:", err);
          reject(err);
        } else {
          if (result.length > 0) {
            // Si la dirección ya existe, no hacer nada o retornar la dirección existente
            console.log("La dirección ya está registrada.");
            resolve(result[0]); // Devuelve la dirección existente
          } else {
            // Si no existe, insertamos la nueva dirección
            const queryInsert = `INSERT INTO direcciones (dirección, numero, piso, puerta, cod_postal, ciudad, provincia, país, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            connection.execute(
              queryInsert,
              [
                direccionData.dirección,
                direccionData.numero,
                direccionData.piso,
                direccionData.puerta,
                direccionData.cod_postal,
                direccionData.ciudad,
                direccionData.provincia,
                direccionData.país,
                idCliente
              ],
              (err, result) => {
                if (err) {
                  console.error("Error al insertar dirección:", err);
                  reject(err);
                } else {
                  console.log("Dirección insertada con éxito.");
                  resolve(result);
                }
              }
            );
          }
        }
      }
    );
  });
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
