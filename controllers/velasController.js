const velasModel = require('../models/velasModel');

const getVelasByCategoria = async (req, res) => {
  const categoria = req.params.categoria;

  try {
    const velas = await velasModel.findVelasByCategoria(categoria); // Aquí traemos las velas según la categoría
    console.log(velas); // Verifica que velas tiene datos en la consola del servidor

    if (!velas || velas.length === 0) {
      return res.status(404).send('No se encontraron velas en esta categoría');
    }

    let vista = categoria; // Usamos el nombre de la categoría como el nombre de la vista
    res.render(vista, { velas, categoria }); // Aquí se pasa velas y categoria a la vista
  } catch (error) {
    console.error("Error al obtener las velas (Controller): ", error);
    res.status(500).send('Hubo un error al obtener las velas.');
  }
};


module.exports = {
  getVelasByCategoria,
};
