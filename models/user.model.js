const mongoose = require('mongoose');
const constants= require('../utils/constants');
const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum:[constants.userTypes.admin,constants.userTypes.user],
        default: constants.userTypes.user
    }

    
},{ timestamps: true, versionKey: false })

module.exports = mongoose.model("User", userSchema);