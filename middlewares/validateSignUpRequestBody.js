

/**
 * Verify the user sign request body
 */
 validateSignUpRequestBody = (req, res, next) => {

    //Validating name
    if(!req.body.name || !req.body.email ){
        return res.status(400).send({
            message : "please fill all fields"
        });
    }
 

    next();
 
 
 }
 
 module.exports = {
     validateSignUpRequestBody 
 }