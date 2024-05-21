const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const { deleteProductFromCart } = require('./cart');
const productPath = path.join(rootDir, 'data','product.json');

exports.saveProduct = (product) => {
    fs.readFile(productPath,(err, productsdata) => {
        if (err) {
            console.error('Error reading product.json:', err);
            return;
        }
        
        let products = [];
        try {
            // Parse JSON data if the file is not empty
            if (productsdata.length > 0) {
                products = JSON.parse(productsdata);
            }
        } catch (parseError) {
            console.error('Error parsing product.json:', parseError);
            return;
        }
        products.push(product);
        fs.writeFile(productPath, JSON.stringify(products), (err) => {
            console.log(err);
        })
    });
}

exports.getAllProduct = (callBack) => {
    const productPath = path.join(rootDir, 'data','product.json');
    fs.readFile(productPath, (err, productsdata) => {
        const products = JSON.parse(productsdata);
        callBack(products);
    });
}

exports.getProductById = (productId, callBack) => {
    fs.readFile(productPath, (err, productsdata) => {
        if (err) {
            console.error('Error reading product.json:', err);
            callBack(undefined); // Pass undefined to indicate error to the callback
            return;
        }

        try {
            const products = JSON.parse(productsdata);
            const productById = products.find((p) =>  parseInt(p.id) === parseInt(productId));
            if (productById) {
                callBack(productById);
            } else {
                console.log('Product with ID ' + productId + ' not found');
                callBack(undefined); // Pass undefined to indicate product not found
            }
        } catch (parseError) {
            console.error('Error parsing product.json:', parseError);
            callBack(undefined); // Pass undefined to indicate error to the callback
        }
    });
}

exports.updatedProductById = (product, productId, callBack) => {
    fs.readFile(productPath, (err, productsData) => {
        if (err) {
            console.error('Error reading product.json:', err);
            callBack(err); // Pass the error to the callback
            return;
        }

        try {
            const products = JSON.parse(productsData);
            const existingProductIndex = products.findIndex((p) => parseInt(p.id) === parseInt(productId));

            if (existingProductIndex !== -1) {
                products[existingProductIndex] = product;

                fs.writeFile(productPath, JSON.stringify(products, null, 2), (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing product.json:', writeErr);
                        callBack(writeErr); // Pass the write error to the callback
                        return;
                    }
                    callBack(null); // Indicate success
                });
            } else {
                console.log('Product with ID ' + productId + ' not found');
                callBack(new Error('Product not found')); // Pass an error indicating the product was not found
            }
        } catch (parseError) {
            console.error('Error parsing product.json:', parseError);
            callBack(parseError); // Pass the parse error to the callback
        }
    });
};

exports.deleteProductId = (productId, callBack) => {
    fs.readFile(productPath, (err, productsData) => {
        // console.log(productsData,'productsData');
        if (err) {
            console.error('Error reading product.json:', err);
            callBack(err); // Pass the error to the callback
        }

        try {
            const products = JSON.parse(productsData);
            const updatedProduct = products.filter((p) => p.id !== productId);
            // console.log(updatedProduct,'updatedProduct');
            deleteProductFromCart(productId);
            if (updatedProduct) {
                fs.writeFile(productPath, JSON.stringify(updatedProduct), (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing product.json:', writeErr);
                        callBack(writeErr); // Pass the write error to the callback
                        return;
                    }
                    callBack(null); // Indicate success
                });
            } else {
                console.log('Product with ID ' + productId + ' not found');
                callBack(new Error('Product not found')); // Pass an error indicating the product was not found
            }
        } catch (parseError) {
            console.error('Error parsing product.json:', parseError);
            callBack(parseError); // Pass the parse error to the callback
        }
    });
}