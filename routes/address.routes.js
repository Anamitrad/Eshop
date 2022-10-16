const addressController = require('../controllers/shippingaddress.controller')
const validateUser = require('../middlewares/authjwt')
module.exports= (app)=>{
    app.post("/eshop/api/v1/addresses",[validateUser.verifyToken],addressController.createAddress);
}