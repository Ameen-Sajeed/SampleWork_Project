const { addproduct } = require("../helpers/adminhelper")
const adminhelper = require("../helpers/adminhelper")
const userhelper = require("../helpers/userhelper")


const admin ={
    myEmail: "ameen@gmail.com",
    myPassword:123
}
 /* -------------------------------------------------------------------------- */
 /*                                  get Login                                 */
 /* -------------------------------------------------------------------------- */

const getLogin = (req, res) => {
   
    // if(req.session.admin){
    //     res.redirect('/admindashboard')
    // }
    //  else {
    //     res.render('admin/adminLogin')
    // }

    res.render('admin/adminLogin')
}

 /* -------------------------------------------------------------------------- */
 /*                                 Post Login                                 */
 /* -------------------------------------------------------------------------- */

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


 /* -------------------------------------------------------------------------- */
 /*                                 Get Logout                                 */
 /* -------------------------------------------------------------------------- */

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
    

  /* -------------------------------------------------------------------------- */
  /*                             get Admindashboard                             */
  /* -------------------------------------------------------------------------- */

const admindashboard=(req,res)=>{

    res.render('admin/Admin-dashboard')
}

 /* -------------------------------------------------------------------------- */
 /*                                  get Users                                 */
 /* -------------------------------------------------------------------------- */

const getUsers=(req,res)=>{
   adminhelper.viewUsers().then((data)=>{
    console.log(data)
    res.render('admin/User',{data})
   })
    
}

  /* -------------------------------------------------------------------------- */
  /*                                 block Users                                */
  /* -------------------------------------------------------------------------- */

  const blockUsers=(req,res)=>{
    let proId = req.params.id
    console.log(proId)
    adminhelper.blockUser(proId).then((data)=>{
        res.redirect('/admin-users')
    })
}

/* -------------------------------------------------------------------------- */
 /*                                unblock Users                               */
 /* -------------------------------------------------------------------------- */

 const unblockUsers=(req,res)=>{
    let proId = req.params.id
    console.log(proId)
    adminhelper.unblockUser(proId).then((data)=>{
        res.redirect('/admin-users')
    })
}

 /* -------------------------------------------------------------------------- */
 /*                                get Products                                */
 /* -------------------------------------------------------------------------- */

 const getproducts=(req,res)=>{
    adminhelper.viewProducts().then((product)=>{
        // console.log(product)
        res.render('admin/product',{product})
    })
}


 /* -------------------------------------------------------------------------- */
 /*                               get addproduct                               */
 /* -------------------------------------------------------------------------- */

const getaddproducts=(req,res)=>{
   
adminhelper.viewCategory().then((category)=>{
    res.render('admin/addproduct',{category:category})
})

    
}

/* -------------------------------------------------------------------------- */
/*                               post addproduct                              */
/* -------------------------------------------------------------------------- */

const postaddproducts=(req,res)=>{
    const filename = req.files.map(function (file) {
        return file.filename
    })
    req.body.image = filename
    adminhelper.addproduct(req.body).then((response) => {
        if (response.status) {
            res.redirect('/admin-addproduct')
        } else {
            // res.send('product added')
            res.redirect('/admin-products')


        }

    })
}


/* -------------------------------------------------------------------------- */
/*                               delete products                              */
/* -------------------------------------------------------------------------- */

const deleteProducts=(req,res)=>{

    let delId= req.params.id
    adminhelper.deleteproduct(delId).then((data)=>{
        res.redirect('/admin-products')
    })

}
 /* -------------------------------------------------------------------------- */
 /*                               update Product                               */
 /* -------------------------------------------------------------------------- */

 const getupdateproduct=(req,res)=>{
  
    let Id=req.params.id
    adminhelper.ViewUpdateproduct(Id).then((data)=>{
       adminhelper.viewCategory().then((category)=>{
        console.log(data)
        res.render('admin/updateproduct',{data,category})
       }) 
     
    })
}

/* -------------------------------------------------------------------------- */
/*                             Post update Product                            */
/* -------------------------------------------------------------------------- */

const postupdateproduct=(req,res)=>{

    // console.log(req.files)
    const filename = req.files.map(function(file){
        return file.filename
    })
    req.body.image = filename

    let Id = req.params.id
    console.log(req.body);
    adminhelper.updateProduct(Id,req.body).then((data)=>{
        // console.log(data)
        res.redirect('/admin-products')
    })
}



/* -------------------------------------------------------------------------- */
/*                                get Category                                */
/* -------------------------------------------------------------------------- */

const getCategory=(req,res)=>{
  adminhelper.viewCategory().then((category)=>{
    res.render('admin/category',{category})
  })  
}

/* -------------------------------------------------------------------------- */
/*                                post category                               */
/* -------------------------------------------------------------------------- */

const postCategory=(req,res)=>{
    adminhelper.addcategory(req.body).then((data)=>{
        console.log(data)
        res.redirect('/admin-category')
    })


}

 /* -------------------------------------------------------------------------- */
 /*                                view Category                               */
 /* -------------------------------------------------------------------------- */

const viewCategory=(req,res)=>{
    res.render('admin/viewCategory')
}

/* -------------------------------------------------------------------------- */
/*                               delete category                              */
/* -------------------------------------------------------------------------- */

const deletecategorys=(req,res)=>{
    let catId=req.params.id
    adminhelper.deletecategory(catId).then((data)=>{
        res.redirect('/admin-category')
    })
}

/* -------------------------------------------------------------------------- */
/*                                 View Banner                                */
/* -------------------------------------------------------------------------- */

const getBanner=(req,res)=>{
    adminhelper.viewBanner().then((banner)=>{

    res.render('admin/viewBanner',{banner})
})
}

/* -------------------------------------------------------------------------- */
/*                                 Add Banner                                 */
/* -------------------------------------------------------------------------- */

const addBanner=(req,res)=>{
        res.render('admin/addBanner')

   
}

/* -------------------------------------------------------------------------- */
/*                               Post AddBanner                               */
/* -------------------------------------------------------------------------- */

const postaddBanner=(req,res)=>{
    console.log(req.body)

    const filename = req.files.map(function (file) {
        return file.filename
    })
    req.body.image = filename
    adminhelper.addBanner(req.body).then((response) => {
        if (response.status) {
            res.redirect('/admin-addproduct')
        } else {
            // res.send('product added')
            res.redirect('/admin-products')


        }

    })

}



module.exports =  {admindashboard,getproducts,getUsers,
    getLogin,getaddproducts,postLogin,getlogout,getCategory,postCategory,
    blockUsers,unblockUsers,deleteProducts,viewCategory,deletecategorys,
    getupdateproduct,postupdateproduct,postaddproducts,getBanner,addBanner,postaddBanner} ;