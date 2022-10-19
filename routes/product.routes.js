const productController = require('../controllers/product.controller');
const authjwt = require('../middlewares/authjwt');

module.exports = (app) => {
    app.get("/eshop/api/v1/products/", productController.searchAllProducts);

    app.get("/eshop/api/v1/products/categories/", productController.getProductCategories);

    app.get("/eshop/api/v1/products/:id/", productController.searchProductById);

    app.post("/eshop/api/v1/products/", [authjwt.verifyToken, authjwt.isAdmin], productController.saveProduct);

    app.put("/eshop/api/v1/products/:id", [authjwt.verifyToken, authjwt.isAdmin], productController.updateProduct);

    app.delete("/eshop/api/v1/products/:id", [authjwt.verifyToken, authjwt.isAdmin], productController.deleteProduct);
}