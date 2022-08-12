const adminhelper = require("../helpers/adminhelper")
const userhelper = require("../helpers/userhelper")
// const multer= require('multer')



// // for uploading  multiple images

// const fileStorageEngine = multer.diskStorage({
//     destination: (req,file,cb)=>{
//         cb(null,'./public/admin/images')
//     },
//     filename:(req,file,cb)=>{
//         console.log(file);
//         cb(null,Date.now() + file.originalname)
//     }
// })

// const upload = multer({ storage:fileStorageEngine})

const admin ={
    myEmail: "ameen@gmail.com",
    myPassword:123
}
// get Login
const getLogin = (req, res) => {
   
    if(req.session.admin){
        res.redirect('/admindashboard')
    }
     else {
        // const message = req.flash('msg')
        res.render('adminLogin')
    }
}

// Post Login

const postLogin = (req, res) => {
    const { email, password } = req.body;
    if (email == admin.myEmail && password == admin.myPassword) {
    
        req.session.admin = req.body.email;
        res.redirect('/admindashboard')
    } else {
    
        req.flash('msg', 'INCORRECT DETAILS');
        res.redirect('/admin-login');
    }
    }


    // Get Logout

    const getlogout = (req, res) => {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err)
                res.send('error')
            }
            else {
                res.redirect('/admin-login')
            }
        })
    }
    

// get Admindashboard

const admindashboard=(req,res)=>{

    res.render('Admin-dashboard')
}


// //get Products

const getproducts=(req,res)=>{
    adminhelper.viewProducts().then((product)=>{
        // console.log(product)
        res.render('product',{product})
    })
}



// get Users 

const getUsers=(req,res)=>{
   adminhelper.viewUsers().then((data)=>{
    console.log(data)
    res.render('User',{data})
   })
    
}

// get addproduct

const getaddproducts=(req,res)=>{
   
adminhelper.viewCategory().then((category)=>{
    res.render('addproduct',{category:category})
})

    
}

// // Post addProducts

// const postaddproducts=upload.array('image')(req,res)=>{
//     adminhelper.addproduct(req.body).then((data)=>{
//         console.log(data)
//         res.render('addproduct')
//     })


// }



const getCategory=(req,res)=>{
  adminhelper.viewCategory().then((category)=>{
    res.render('category',{category})
  })  
    // res.render('category')
}

const postCategory=(req,res)=>{
    adminhelper.addcategory(req.body).then((data)=>{
        console.log(data)
        res.redirect('/admin-category')
    })


}
// getProductDetails

const getproductsDetails=(req,res,next)=>{
    let proId= req.params.id
    console.log(proId)
    userhelper.Viewproductdetail(req.params.id).then((data)=>{
        res.render('productDetails',data)
    })
        
    }
   



// view Category

const viewCategory=(req,res)=>{
    res.render('viewCategory')
}
// block Users

const blockUsers=(req,res)=>{
    let proId = req.params.id
    console.log(proId)
    adminhelper.blockUser(proId).then((data)=>{
        res.redirect('/admin-users')
    })
}

// unblock Users 

const unblockUsers=(req,res)=>{
    let proId = req.params.id
    console.log(proId)
    adminhelper.unblockUser(proId).then((data)=>{
        res.redirect('/admin-users')
    })
}

const deleteProducts=(req,res)=>{

    let delId= req.params.id
    adminhelper.deleteproduct(delId).then((data)=>{
        res.redirect('/admin-products')
    })

}

const deletecategorys=(req,res)=>{
    let catId=req.params.id
    adminhelper.deletecategory(catId).then((data)=>{
        res.redirect('/admin-category')
    })
}

// update Product

const getupdateproduct=(req,res)=>{
    // adminhelper.viewCategory().then((category)=>{
    //     res.render('updateproduct',{category:category})
    // })
    let Id=req.params.id
    adminhelper.ViewUpdateproduct(Id).then((data)=>{
        console.log(data)
        res.render('updateproduct',{data})
    })
}

const postupdateproduct=(req,res)=>{
    let Id = req.params.id
    console.log(Id);
    adminhelper.updateProduct(Id,req.body).then((data)=>{
        // console.log(data)
        res.redirect('/admin-products')
    })
}



module.exports =  {admindashboard,getproducts,getUsers,
    getLogin,getaddproducts,postLogin,getlogout,getCategory,postCategory,
    blockUsers,unblockUsers,deleteProducts,viewCategory,deletecategorys,
    getproductsDetails,getupdateproduct,postupdateproduct} ;