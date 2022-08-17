var express = require('express');
const { getLogin, getLoginRegister, postSignup, postLogin, getproductsDetails, homepage, nodata, getcart, getcheckout, getOtp, confirmOtp, postOtp, getSignUp, postconfirmOtp} = require('../controllers/userContollers');
var router = express.Router();


/* -------------------------------------------------------------------------- */
/*                              User Login Routes                             */
/* -------------------------------------------------------------------------- */

router.get('/login', getLogin)

router.post('/login',postLogin)

router.get('/login-register',getLoginRegister)

router.get('/signup',getSignUp)

router.post('/signup',postSignup)

router.get('/',homepage)

router.get('/productdetails/:id',getproductsDetails)

router.get('/error',nodata)

router.get('/cart',getcart)

router.get('/checkout',getcheckout)

router.get('/otp',getOtp)

router.post('/otp',postOtp)

router.get('/confirmotp',confirmOtp)

router.post('/confirmotp',postconfirmOtp)

module.exports = router;
