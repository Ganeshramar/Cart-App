const fs = require('fs');
const rootDir = require('../utils/path');
const path = require('path'); 
const cartPath = path.join(rootDir,'data', 'cart.json');

exports.getCartDetailsFromFile = (callBack) => {
    fs.readFile(cartPath, (err,cartContent) => {
        let cart = {products:[], totalPrice:0};
        if (!err && cartContent.length > 0) {
            try {
                cart = JSON.parse(cartContent);
                // Ensure cart.products is an array
                if (!Array.isArray(cart.products)) {
                    cart.products = [];
                }
            } catch (parseErr) {
                console.error('Error parsing cart content:', parseErr);
            }
        }
        return callBack(cart);
    })
}

exports.addProductToCart = (productId, productPrice) => {
    this.getCartDetailsFromFile((cart) => {
        let cartProduct = cart.products;
        let existingProductIndex = cartProduct.findIndex(prod => parseInt(prod.id)  === parseInt(productId));
        let updatedProduct;
        
        if(existingProductIndex !== -1){
            updatedProduct = { ...cart.products[existingProductIndex]};
            updatedProduct.quantity += 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
        }else{
            updatedProduct = { id: productId, quantity: 1};
            cart.products = [...cart.products, updatedProduct];
        }
        cart.totalPrice += +productPrice;
        fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
            console.log(err,'error');
        })
    })
}

exports.deleteProductFromCart = (productId, callBack = '') => {
    this.getCartDetailsFromFile((cart) => {
        let cartProduct = cart.products;
        let updatedProduct = cartProduct.filter(prod => parseInt(prod.id)  !== parseInt(productId));
        fs.writeFile(cartPath, JSON.stringify({products: updatedProduct}), (err) => {
            console.log(err,'error');
        });
        if(callBack){
            callBack();
        }
    })
}