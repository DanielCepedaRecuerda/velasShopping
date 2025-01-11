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

    Promise.all(queries)
      .then((results) => {
        console.log("Todos los productos insertados con éxito en el pedido.");
        resolve(results);
      })
      .catch((err) => {
        console.error("Error al insertar productos en el pedido:", err);
        reject(err);
      });
  });
};

const insertarDireccion = (idCliente, direccionData) => {
  return new Promise((resolve, reject) => {
    if (!direccionData) {
      console.error("No se recibió información de dirección");
      console.log(direccionData);
      reject(new Error("No se recibió información de dirección"));
    }
    connection.query(
      "INSERT INTO direcciones (dirección, numero, piso, puerta, cod_postal, ciudad, provincia, país, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        direccionData.direccion,
        direccionData.numero || 0,
        direccionData.piso || 0,
        direccionData.puerta || '',
        direccionData.codigoPostal || 0,
        direccionData.ciudad || '',
        direccionData.provincia || '',
        direccionData.pais || '',
        idCliente,
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

module.exports = {
  procesarPago,
  insertarPedido,
  insertarDireccion,
  insertarProductosPedidos,
};
