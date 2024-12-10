const velasModel = require('../models/velasModel');

const getVelasByCategoria = async (req, res) => {
  // Obtenemos la categoría en función del parámetro de la URL
  const categoria = req.params.categoria; // Dependiendo de la ruta, obtendremos 'velasAromaticas', 'velasTematicas' o 'velasDecorativas'

  try {
    // Llamamos al modelo para obtener las velas según la categoría
    const velas = await velasModel.findVelasByCategoria(categoria);

    // Renderizamos la vista y pasamos las velas
    res.render('velas', { velas, categoria });
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al obtener las velas.');
  }
};

module.exports = {
  getVelasByCategoria
};
