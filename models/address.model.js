const mongoose = require('mongoose');
const addressSchema = mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    state:  {
        type: String,
        required: true
    },
    street :{
        type: String
    },
    landmark :{
        type: String
    },
    contactNumber :{
        type: Number,
        required: true,
        unique: true
    },
    zipCode :{
        type: Number,
        required: true, 
    },
    userId :{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
     }

},{timestamps: true, versionKey: false })
module.exports = mongoose.model("Address",addressSchema);