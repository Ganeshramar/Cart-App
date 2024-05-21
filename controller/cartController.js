const { addProductToCart, getCartDetailsFromFile, deleteProductFromCart } = require("../models/cart");
const { getProductById, getAllProduct } = require("../models/product.model");

exports.getCartPage = (req,res) => {
    const productId = req.body.productId;
    getProductById(productId, product => {
        addProductToCart(productId, product.price);
        res.redirect('/');
    });
}; 

exports.postCartPage = (req,res) => {
    getCartDetailsFromFile((cart) => {
        let cartProduct = cart.products;
        getAllProduct((products) => {
            const productsData = [];
            let totalPrice = 0;
            for(let cartItem of cartProduct){
                let singleProduct = products.find((p) => parseInt(p.id) === parseInt(cartItem.id));
                let cartProductPrice = +cartItem.quantity * +singleProduct.price;
                totalPrice += cartProductPrice;
                productsData.push({ ...singleProduct, quantity: cartItem.quantity, cartPrice: cartProductPrice.toFixed(2)});
            }
            const viewsData = {
                pageTitle: 'Cart Details',
                cartProducts: productsData,
                totalPrice
            }
            res.render('cartDetails',viewsData);
        })
    })
}; 

exports.postDeleteCartItem = (req,res) => {
    const productId = req.body.productId;
    deleteProductFromCart(productId, () => {
        res.redirect('/cart');
    })
}