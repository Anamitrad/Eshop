const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');


exports.createOrder = async (req, res) => {
    
    const orderBody={
        userId: req.userId,
        productId: req.body.productId,
        shippingAddress: req.body.addressId,
        product: req.body.productId,
        quantity: req.body.quantity ?? 1,
        amount: ((req.body.quantity ?? 1) * req.body.price).toFixed(2),
        orderDate: (new Date()).toISOString()
    }
    try {
        const order = await Order.create(orderBody);

        const productUpdate = await Product.findOneAndUpdate({ _id: req.body.productId }, { $inc: { availableItems: -order.quantity } });

        const response = await Order.findOne({ _id: order._id }).populate('userId').populate('shippingAddressId').populate('productId');

        return res.status(201).send(response);

    } catch (err) {
        console.log("Error while creating order: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while creating the order"
        });
    }
}