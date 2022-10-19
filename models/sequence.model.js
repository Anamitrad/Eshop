const mongoose = require('mongoose');
const sequenceSchema =new mongoose.Schema({
    users:{ 
        type: Number,
        required : true,
    },
    address: { 
        type: Number,
        required : true,
    },
    products: {
        type: Number,
        required : true,
    },
    orders: {
        type: Number,
        required : true,
    }
})
module.exports = mongoose.model("Schema",sequenceSchema)