const velasModel = require('../models/velasModel');

const getVelasByCategoria = async (req, res) => {
  const categoria = req.originalUrl.split('/').pop();  // Obtiene la categoría desde la URL

  try {
    // Consultar las velas de acuerdo a la categoría obtenida
    const velas = await velasModel.findVelasByCategoria(categoria);
    console.log(velas);
    if (!velas || velas.length === 0) {
      return res.status(404).send('No se encontraron velas en esta categoría');
    }

    // Si la categoría es válida, renderizamos la vista correspondiente
    res.render(categoria, { velas, categoria });
  } catch (error) {
    console.error("Error al obtener las velas (Controller): ", error);
    res.status(500).send('Hubo un error al obtener las velas.');
  }
};

module.exports = {
  getVelasByCategoria,
};
