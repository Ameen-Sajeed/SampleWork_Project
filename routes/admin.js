var express = require('express');
const {admindashboard,getproducts, getUsers, getLogin, getaddproducts, postLogin,getlogout, postaddproducts, getCategory, postCategory, blockUsers, unblockUsers, deleteProducts, viewCategory, deletecategorys, updateproduct, getupdateproduct, postupdateproduct} = require('../controllers/adminContollers');
const adminhelper= require('../helpers/adminhelper')
var router = express.Router();
var multer=require('multer')


// for uploading  multiple images

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/Admin/images')
    },
    filename:(req,file,cb)=>{
        // console.log(file);
        cb(null,Date.now() + file.originalname)
    }
})
const upload = multer({ storage:fileStorageEngine})

router.get('/admin-login',getLogin)

router.post('/admin-login',postLogin)

router.get("/logout",getlogout)

router.get('/admindashboard',admindashboard)

router.get('/admin-products',getproducts)

router.get('/admin-users',getUsers)

router.get('/admin-addproducts',getaddproducts)

// router.post('/admin-addproducts',postaddproducts)

router.post('/admin-addproducts',upload.array('image',4),(req,res)=>{
    console.log(req.body);
    console.log(req.files);
    adminhelper.addproduct(req.body,(data)=>{
        let image = req.files.image
    })

var filename = req.files.map(function(file){
    // console.log(filename);
    return file.filename;
});

 req.body.image = filename;
 console.log(req.body);

})

router.get('/admin-category',getCategory)

router.post('/admin-category',postCategory)

router.get('/admin-viewcategory',viewCategory)

router.get('/admin-users/:id',blockUsers)

router.get('/admin-user/:id',unblockUsers)

router.get('/admin-deleteProduct/:id',deleteProducts)

router.get('/admin-deletecategory/:id',deletecategorys)

router.get('/admin-updateproducts/:id',getupdateproduct)

router.post('/admin-updateproducts/:id',postupdateproduct)

module.exports = router;
