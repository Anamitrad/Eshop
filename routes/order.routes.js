const orderController = require('../controllers/order.controller')
const authjwt = require('../middlewares/authjwt');

module.exports= (app)=>{
    app.get("/eshop/api/v1/orders",authjwt.verifyToken,orderController.createOrder);
}