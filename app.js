let express = require('express')
let app = express();
let dbConfig = require('./config/db.config')
let serverConfig = require('./config/server.config')
const bcrypt = require('bcrypt');
const constants = require("./utils/constants");


let mongoose = require('mongoose')
let Sequence = require('./models/sequence.model')
mongoose.connect(dbConfig.DB_URL);

/**
 * Register the MW to read the JSON request body
 */
 app.use(express.json());

const db = mongoose.connection;

db.on('error', () => {
    console.log("Error while connecting to the db");
});
db.on("open", () => {
    console.log("Connected to the MongoDB");
    /**
     * Write the code to init the db
     */
    // init();
})

// async function init(){
//     try{
//         let count = await Sequence.find({}).count();
//         if(count===1)
//         {
//             console.log("Sequence created");
//             return;
//         }
//     }
//     catch(err){
//         console.log("error while fetching sequence ", err.message);
//     }
//     try{
//         let sequence = await Sequence.create({
//             users: 0,
//             address: 0,
//             products: 0,
//             orders: 0,
//         })
//         console.log(sequence);
//     }
//     catch(err){
//         console.log("error while creating sequence ", err.message);
//     }
// }
/**
 * Plug in the routes
 */
 require("./routes/auth.routes")(app);
 require("./routes/address.routes")(app);
 require("./routes/product.routes")(app);
 
 /**
  * Start the server
  */
 app.listen(serverConfig.PORT, () => {
     console.log(`Server started on the port no : ${serverConfig.PORT}`);
 })