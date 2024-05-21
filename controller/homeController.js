
// const {products} = require('../utils/product');
const {getAllProduct, getProductById} = require('../models/product.model')

exports.getHomePage = (req,res) => {
    getAllProduct(products => {
        const viewsData = {
            admin: false,
            pageTitle: 'Home - Product Page',
            products
        }
        res.render('product-list',viewsData);
    })
};

exports.getProductDetails = (req,res) => {
    const productId = req.params.productId;
    getProductById(productId, product => {
        // console.log(product)
        const viewsData = {
            pageTitle: product.title,
            product
        }
        res.render('productDetails',viewsData);
    });
}