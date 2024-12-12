const velasModel = require('../models/velasModel');

const getVelasByCategoria = async (req, res) => {
  const categoria = req.params.categoria;  // Esto obtiene el parámetro de la URL
  console.log('Entrando en la función getVelasByCategoria');
  try {
    // Consultar las velas de acuerdo a la categoría obtenida
    const velas = await velasModel.findVelasByCategoria(categoria);

    if (!velas || velas.length === 0) {
      return res.status(404).send('No se encontraron velas en esta categoría');
    }

    // Añadir la ruta de la imagen a cada vela
    console.log('Cargando imágenes...');
velas.forEach(vela => {
  vela.imagen = `/images/${vela.nombre}.jpg`;
  console.log(vela.imagen);
});

    // Si la categoría es válida, renderizamos la vista correspondiente
    res.render(categoria, { velas, categoria });
  } catch (error) {
    console.error("Error al obtener las velas: ", error);
    res.status(500).send('Hubo un error al obtener las velas.');
  }
};

module.exports = {
  getVelasByCategoria,
};
