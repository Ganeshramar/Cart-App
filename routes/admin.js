const express = require('express');
const router = express();
const {getAddProductPage, postAddProductPage, getAdminProductPage, getEditProductPage, postEditProductPage, postDeleteProductPage} = require('../controller/admin/productController');

router.get('/', getAdminProductPage);

router.get('/add', getAddProductPage);
router.post('/add', postAddProductPage);

router.get('/edit/:productId', getEditProductPage);
router.post('/edit', postEditProductPage);

router.post('/delete', postDeleteProductPage);

module.exports = router;