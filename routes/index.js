var express = require('express');
// const { getproducts } = require('../controllers/adminContollers');
var router = express.Router();

/* GET landing page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/ad',getproducts)


module.exports = router;
