

var signupRouter = require('./signupRouter');

var router = {
    run: function(req, res) {
        signupRouter.run(req, res);
    }
};

module.exports = router;