const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.signup = async (req,res)=>{
    let userObj={};
    let id= User.find({}).count() +1;
    userObj.id = req.body.id;
    userObj.email = req.body.email;
    req.body.name ?userObj.name = req.body.name:'';
    req.body.first_name ?userObj.first_name = req.body.first_name:'';
    req.body.last_name ?userObj.last_name = req.body.last_name:'';
    userObj.password = bcrypt.hashSync(req.body.password, 8);

    try {
        /**
         * I will have to store that in DB
         */
        const user = await User.create(userObj);
        /**
         * I will have to return back the response
         */
        const userResp ={}
           userResp.id= user.id
           userResp.email = user.email
           (userObj.first_name)?userResp.first_name = userObj.first_name :'';
           (userObj.last_name)?userResp.last_name = userObj.last_name :'';
           res.status(201).send(userResp);
        }
     catch (err) {
        console.log("Error while creating new user ", err.message);
        res.status(500).send({
            message: "Some internal error happened while inseting new user"
        })
    }
} 
exports.login = async (req,res)=>{
    const user = await User.findOne({email : req.body.email});
    if(!user){
        return res.status(400).send({
            message : "Email passed is incorrect, no user exists"
        })
    }
    const isPwdValid = bcrypt.compareSync(req.body.password,user.password);
    
    if(!isPwdValid){
        return res.status(400).send({
            "message" : "Password provided is incorrect"
        })
    }
    const token = jwt.sign({id : user.id},authSecret.secret, {
        expiresIn : 120
    });
    res.set('x-auth-token',token);
    res.status(200).send(
        {
            email: req.body.email,
            name: req.body.name,
            isAuthenticated: true
        }
    );

}