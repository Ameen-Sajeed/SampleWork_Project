var express = require('express');
const { getLogin, getLoginRegister, postSignup, postLogin, getproductsDetails, homepage, nodata, getcart, getcheckout} = require('../controllers/userContollers');
var router = express.Router();


/* -------------------------------------------------------------------------- */
/*                              User Login Routes                             */
/* -------------------------------------------------------------------------- */

router.get('/login', getLogin)

router.post('/login',postLogin)

router.get('/login-register',getLoginRegister)

router.post('/signup',postSignup)

router.get('/',homepage)

router.get('/productdetails/:id',getproductsDetails)

router.get('/error',nodata)

router.get('/cart',getcart)

router.get('/checkout',getcheckout)

module.exports = router;
