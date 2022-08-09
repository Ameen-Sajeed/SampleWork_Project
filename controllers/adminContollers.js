const adminhelper = require("../helpers/adminhelper")
const multer= require('multer')



// for uploading  multiple images

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/admin/images')
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,Date.now() + file.originalname)
    }
})

const upload = multer({ storage:fileStorageEngine})

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
    res.render('product')
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
    //  adminhelper.addproduct(req.body).then((data)=>{
    //     console.log(data)
        res.render('addproduct')
    //  })

    
}

// // Post addProducts

// const postaddproducts=upload.array('image')(req,res)=>{
//     adminhelper.addproduct(req.body).then((data)=>{
//         console.log(data)
//         res.render('addproduct')
//     })


// }



const getCategory=(req,res)=>{
    res.render('category')
}

const postCategory=(req,res)=>{
    adminhelper.addcategory(req.body).then((data)=>{
        console.log(data)
        res.render('category')
    })


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





module.exports =  {admindashboard,getproducts,getUsers,getLogin,getaddproducts,postLogin,getlogout,getCategory,postCategory,blockUsers,unblockUsers} ;