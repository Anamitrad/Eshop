const Address = require('../models/address.model');
const User = require('../models/user.model');
exports.createAddress = async (req,res)=>{
    let addObj={};
    addObj.city=req.body.city;
    addObj.state=req.body.state;
    req.body.street? addObj.street = req.body.street:'';
    req.body.landmark? addObj.landmark = req.body.landmark:'';
    addObj.contactNumber = req.body.contactNumber;
    addObj.zipCode = req.body.zipCode;
    addObj.userId = req.userId;

    try{
        const address = await Address.create(addObj);
        const user = await User.find({_id : req.userId});
        const addRes={};
            addRes._id =  user._id;
            addRes.name = user.name;
            addRes.contactNumber = address.contactNumber;
            address.landmark? addRes.landmark = address.landmark:'';
            address.street? addRes.street = address.street:'';
            addRes.city = address.city;
            addRes.state = address.state;
            addRes.createdAt = address.createdAt;
            addRes.updatedAt = address.updatedAt;
            addRes.user = user;
            res.status(201).send(addRes);
    }
    catch(err){
        console.log("Error while creating address ", err.message);
        res.status(500).send({
            message: "Some internal error happened while creating address"
        })
    }
}