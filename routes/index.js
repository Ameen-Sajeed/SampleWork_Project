var express = require('express');
const adminhelper = require('../helpers/adminhelper');
// const { getproducts } = require('../controllers/adminContollers');
var router = express.Router();

/* GET landing page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  adminhelper.viewProducts().then((product)=>{
   adminhelper.viewCategory().then((category)=>{
    res.render('index', {product,user,category});
   })
  
  })
 
});

// router.get('/ad',getproducts)


module.exports = router;
