const {saveProduct, getAllProduct, getProductById, updatedProductById, deleteProductId} = require('../../models/product.model')

exports.getAddProductPage = (req,res) => {
    const viewsData = {
        edit: false,
        pageTitle: 'Add Product'
    }
    res.render('addProduct',viewsData);
};

exports.postAddProductPage = (req,res) => {
    const product = {
        id: Date.now().toString(),
        title: req.body.title,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description
    }
    saveProduct(product);
    res.redirect('/');
};

exports.getAdminProductPage = (req,res) => {
    getAllProduct((products) => {
        const viewsData = {
            admin: true,
            pageTitle: 'Admin - Product Page',
            products
        }
        res.render('product-list',viewsData)
    })
};

exports.getEditProductPage = (req,res) => {
    const productId = req.params.productId;
    getProductById(productId, (product) => {
        const viewsData = {
            edit: true,
            product,
            pageTitle: 'Edit Product'
        }
        // console.log(viewsData,'viewsData');
        res.render('addProduct',viewsData);
    })
};

exports.postEditProductPage = (req,res) => {
    const product = {
        id: req.body.productId,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image
    };
    updatedProductById(product, req.body.productId, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to update product');
        }
        res.redirect('/products');
    });
};

exports.postDeleteProductPage = (req,res) => {
    const productId = req.body.productId;
    deleteProductId(productId,(err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to delete product');
        }
        res.redirect('/products');
    })
}