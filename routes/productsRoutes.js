const express = require('express');
const { getAllProducts } = require('../controllers/productsController');
const router = express.Router();

router.get('/productos', getAllProducts);

module.exports = router;
