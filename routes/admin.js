var express = require('express');
const {admindashboard,getproducts, getUsers, getLogin, getaddproducts, postLogin,getlogout, postaddproducts, getCategory, postCategory} = require('../controllers/adminContollers');

var router = express.Router();


router.get('/admin-login',getLogin)

router.post('/admin-login',postLogin)

router.get("/logout",getlogout)

router.get('/admindashboard',admindashboard)

router.get('/admin-products',getproducts)

router.get('/admin-users',getUsers)

router.get('/admin-addproducts',getaddproducts)

router.post('/admin-addproducts',postaddproducts)

router.get('/admin-category',getCategory)

router.post('/admin-category',postCategory)


module.exports = router;
