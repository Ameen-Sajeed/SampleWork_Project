const express = require('express');
const { admindashboard, getproducts, getUsers, getLogin, getaddproducts, postLogin, getlogout, postaddproducts, getCategory, postCategory, blockUsers, unblockUsers, deleteProducts, viewCategory, deletecategorys, updateproduct, getupdateproduct, postupdateproduct, getBanner, addBanner, postaddBanner, deleteBanner, viewOrders } = require('../controllers/adminContollers');
const adminhelper = require('../helpers/adminhelper')
const router = express.Router();
const multer = require('../helpers/multer')


/* -------------------------------------------------------------------------- */
/*                                 admin Login  Routes                       */
/* -------------------------------------------------------------------------- */

router.get('/admin-login', getLogin)

router.post('/admin-login', postLogin)

router.get("/logout", getlogout)

/* -------------------------------------------------------------------------- */
/*                                 User Routes                                */
/* -------------------------------------------------------------------------- */

router.get('/admindashboard', admindashboard)

router.get('/admin-users/:id', blockUsers)

router.get('/admin-user/:id', unblockUsers)


/* -------------------------------------------------------------------------- */
/*                               Products Routes                              */
/* -------------------------------------------------------------------------- */

router.get('/admin-products', getproducts)

router.get('/admin-users', getUsers)

router.get('/admin-addproducts', getaddproducts)

router.post('/admin-addproducts', multer.array('image', 4), postaddproducts)

router.get('/admin-deleteProduct/:id', deleteProducts)

router.get('/admin-updateproducts/:id', getupdateproduct)

router.post('/admin-updateproducts/:id', multer.array('image', 4), postupdateproduct)


/* -------------------------------------------------------------------------- */
/*                               Category Routes                              */
/* -------------------------------------------------------------------------- */


router.get('/admin-category', getCategory)

router.post('/admin-category', postCategory)

router.get('/admin-viewcategory', viewCategory)

router.get('/admin-deletecategory/:id', deletecategorys)

/* -------------------------------------------------------------------------- */
/*                                Banner Routes                               */
/* -------------------------------------------------------------------------- */

router.get('/admin-banner', getBanner)

router.get('/admin-addbanner', addBanner)

router.get('/admin-deletebanner/:id', deleteBanner)


router.post('/admin-addbanner', multer.array('image'), postaddBanner)



router.get('/admin-orders',viewOrders)

module.exports = router;




