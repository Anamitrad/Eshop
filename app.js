let express = require('express')
let app = express();
let dbConfig = require('./config/db.config')
let serverConfig = require('./config/server.config')
const bcrypt = require('bcrypt');
const constants = require("./utils/constants");


let mongoose = require('mongoose')
let User= require('./models/user.model')
mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;

db.on('error', () => {
    console.log("Error while connecting to the db");
});
db.once("open", () => {
    console.log("Connected to the MongoDB");
    /**
     * Write the code to init the db
     */
    init();
})

async function init(){
    try{
        let adminUser = await User.findOne({role : 'ADMIN'})
        if(adminUser)
        {
            console.log(adminUser);
            console.log("Admin user already exists");
            return;
        }
    }
    catch(err){
        console.log("error while fetching user ", err.message);
    }
    try{
        let user = await User.create({
            id:1,
            name:'admin',
            email:'admin@admin.com',
            password:bcrypt.hashSync('admin',8),
            role:constants.userTypes.admin
        })
        console.log(user);
    }
    catch(err){
        console.log("error while creating admin ", err.message);
    }
}