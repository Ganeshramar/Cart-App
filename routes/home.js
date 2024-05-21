const express = require('express');
const router = express();
const { getHomePage, getProductDetails } = require('../controller/homeController');
const { postCartPage, getCartPage, postDeleteCartItem } = require('../controller/cartController');

router.get('/',getHomePage);
router.get('/products/details/:productId',getProductDetails);

router.get('/cart', postCartPage);
router.post('/cart', getCartPage);
router.post('/cart/delete-item', postDeleteCartItem);


module.exports = router;