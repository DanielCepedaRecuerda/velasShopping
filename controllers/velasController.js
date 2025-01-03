const velasModel = require('../models/velasModel');

const getVelasByCategoria = async (req, res, redirectUrl) => {
  const categoria = req.params.categoria;  // Esto obtiene el parámetro de la URL
  try {
    // Consultar las velas de acuerdo a la categoría obtenida
    const velas = await velasModel.findVelasByCategoria(categoria);

    if (!velas || velas.length === 0) {
      return res.status(404).send('No se encontraron velas en esta categoría');
    }

    // Si la categoría es válida, renderizamos la vista correspondiente
    res.render(categoria, { velas, categoria, redirectUrl });
  } catch (error) {
    console.error("Error al obtener las velas: ", error);
    res.status(500).send('Hubo un error al obtener las velas.');
  }
};

module.exports = {
  getVelasByCategoria,
};