const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number},
    orderDate: {
        type: Date,
        default: () => Date.now(),
        required: true
    },
    productId :{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product"
     },
     addressId :{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Address"
     },
     userId :{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
     }
})
module.exports = mongoose.model("Order",orderSchema);