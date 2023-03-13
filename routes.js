const express = require('express'),
    routes = express.Router(),
    homeController = require('./controllers/homeController'),
    productController = require('./controllers/productController'),
    categoryController = require('./controllers/categoryController')

//_ = not use the req, if need req set _ to req
routes.get('/', homeController.home);

//products routing
routes.get('/api/v1/products', productController.getProduct);
routes.get('/api/v1/products/:productId', productController.getProductById);
routes.delete('/api/v1/products/:productId', productController.deleteProductById);
routes.post('/api/v1/products', productController.storeProduct);
routes.put('/api/v1/products/:productId', productController.updateProduct);

//categories routing
routes.get('/api/v1/categories', categoryController.getCategories);
routes.get('/api/v1/categories/:categoryId', categoryController.getCategoryById);
routes.delete('/api/v1/categories/:categoryId', categoryController.deleteCategoryById);
routes.post('/api/v1/categories', categoryController.storeCategory);
routes.put('/api/v1/categories/:categoryId', categoryController.updateCategory);

module.exports = routes;