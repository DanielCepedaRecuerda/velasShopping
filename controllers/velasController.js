const velasModel = require('../models/velasModel');

const getVelasByCategoria = async (req, res) => {
  const categoria = req.params.categoria; // 'velasAromaticas', 'velasTematicas' o 'velasDecorativas'

  try {
    // Obtener las velas de la base de datos según la categoría
    const velas = await velasModel.findVelasByCategoria(categoria);

    if (!velas) {
      return res.status(404).send('No se encontraron velas en esta categoría');
    }

    // Renderiza la vista pasándole las velas y la categoría
    res.render('velas', { velas, categoria });
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al obtener las velas.');
  }
};

module.exports = {
  getVelasByCategoria,
};
