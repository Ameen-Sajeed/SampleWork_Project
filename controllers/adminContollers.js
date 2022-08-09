const adminhelper = require("../helpers/adminhelper")




const admin ={
    myEmail: "ameen@gmail.com",
    myPassword:123
}

const getLogin = (req, res) => {
   
    if(req.session.admin){
        res.redirect('/admindashboard')
    }
     else {
        // const message = req.flash('msg')
        res.render('adminLogin')
    }
}

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
    






// // get Login

// const getLogin=(req,res)=>{
//     res.render('adminLogin')
// }


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


const postaddproducts=(req,res)=>{
    adminhelper.addproduct(req.body).then((data)=>{
        console.log(data)
        res.render('addproduct')
    })


}

const getCategory=(req,res)=>{
    res.render('category')
}

const postCategory=(req,res)=>{
    adminhelper.addcategory(req.body).then((data)=>{
        console.log(data)
        res.render('category')
    })


}




module.exports =  {admindashboard,getproducts,getUsers,getLogin,getaddproducts,postLogin,getlogout,postaddproducts,getCategory,postCategory} ;