const velasModel = require('../models/velasModel');

const getVelasByCategoria = async (req, res) => {
    const categoria = req.params.categoria;  // Esto obtiene el parámetro de la URL

   // Validación de la categoría antes de realizar la consulta
   const categoriasValidas = ['velasAromaticas', 'velasTematicas', 'velasDecorativas'];
   if (!categoria || !categoriasValidas.includes(categoria)) {
       return res.status(400).send('Categoría no válida');
   }

    try {
        // Llamar al modelo que obtiene las velas
        const velas = await velasModel.findVelasByCategoria(categoria);
        console.log(velas);

        if (!velas || velas.length === 0) {
            return res.status(404).send(`No se encontraron velas en la categoría "${categoria}"`);
        }

        // Renderizar la vista correspondiente según la categoría
        res.render(categoria, { velas, categoria });

    } catch (error) {
        console.error("Error al obtener las velas (Controller): ", error);  // Imprime el error
        res.status(500).send('Hubo un error al obtener las velas.');
    }
  };

module.exports = {
  getVelasByCategoria,
};
