var express = require('express');
const { getLogin, getLoginRegister, postSignup, postLogin } = require('../controllers/userContollers');
var router = express.Router();

router.get('/login', getLogin)

router.post('/login',postLogin)

router.get('/login-register',getLoginRegister)

router.post('/signup',postSignup)




module.exports = router;
