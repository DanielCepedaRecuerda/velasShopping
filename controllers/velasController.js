const velasModel = require('../models/velasModel');

const getVelasByCategoria = async (req, res) => {
    const categoria = req.params.categoria;  // Esto obtiene el parámetro de la URL
  
    try {
      const velas = await velasModel.findVelasByCategoria(categoria);  // Llama al modelo que obtiene las velas
  
      if (!velas || velas.length === 0) {
        return res.status(404).send('No se encontraron velas en esta categoría');
      }

    // Decidir qué vista renderizar según la categoría
    let vista = '';
    if (categoria === 'velasAromaticas') {
        vista = 'velasAromaticas'; // Nombre de la vista debe coincidir con el archivo .ejs
    } else if (categoria === 'velasTematicas') {
        vista = 'velasTematicas';  // Nombre de la vista debe coincidir con el archivo .ejs
    } else if (categoria === 'velasDecorativas') {
        vista = 'velasDecorativas'; // Nombre de la vista debe coincidir con el archivo .ejs
    } else {
        return res.status(400).send('Categoría no válida');
    }
      // Si todo está bien, renderiza la vista
      res.render('velas', { velas, categoria });
    } catch (error) {
      alert("Error Controller");
      console.error("Error al obtener las velas: ", error);  // Imprime el error en la consola
      res.status(500).send('Hubo un error al obtener las velas.');
    }
  };

module.exports = {
  getVelasByCategoria,
};
