/**
 * This file will contain the routes information for
 * auth
 */

 const authController = require("../controllers/auth.controller");
 const signUpValidator = require("../middlewares/validateSignUpRequestBody");

 module.exports = (app) => {
    app.post("/eshop/api/v1/users",[signUpValidator.validateSignUpRequestBody],authController.signup);
    app.post("/eshop/api/v1/auth",authController.login);
}