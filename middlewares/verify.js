
/* -------------------------------------------------------------------------- */
/*                      Middleware for verifying session                      */
/* -------------------------------------------------------------------------- */

module.exports = {
    verifyLogin: (req, res, next) => {
        if (req.session.loggedIn) {
            next();
        }
        else {
            res.redirect('/login-register')
        }
    }
}
