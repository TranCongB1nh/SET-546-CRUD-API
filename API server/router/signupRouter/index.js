var routerMethods = require("../methods");
var routes = require("../routes.js");
const { createUser } = require("../../controller/signup");

var signupRouter = {
  run(req, res) {
    routerMethods.post(req, res, routes.signup.value, createUser);
  }
};

module.exports = signupRouter;
