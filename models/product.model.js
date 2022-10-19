const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    // productId: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    available_items:{
        type: Number,
        required : true,
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image_url:{
        type: String,
        required: true,
    },
    manufacturer:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    }
},{timestamps: true, versionKey: false })
module.exports = mongoose.model("Product",productSchema);