const express = require('express');
const { getCart, addToCart, removeFromCart, updateCartQuantity } = require('../controllers/cartController');
const router = express.Router();

router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:productId', removeFromCart);
router.post('/update', updateCartQuantity);

module.exports = router;
