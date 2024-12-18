const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

app.use('/contacto', contactRoutes);

module.exports = router;
