const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/productsController');

router.get('/productos', getAllProducts);

module.exports = router;
