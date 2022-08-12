var express = require('express');
const { getproductsDetails } = require('../controllers/adminContollers');
const { getLogin, getLoginRegister, postSignup, postLogin, getHomePage, getotp } = require('../controllers/userContollers');
var router = express.Router();

router.get('/login', getLogin)

router.post('/login',postLogin)

router.get('/login-register',getLoginRegister)

router.post('/signup',postSignup)

router.get('/homepage',getHomePage)

router.get('/otp',getotp)

router.get('/productdetails/:id',getproductsDetails)

module.exports = router;
