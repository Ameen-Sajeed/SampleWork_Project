const { response } = require("express")
const { MongoClient } = require("mongodb")
const adminhelper = require("../helpers/adminhelper")
const userhelper = require("../helpers/userhelper")
const { doSignup } = require("../helpers/userhelper")

// const verifyLogin=(req,res,next)=>{
//     if(req.session.loggedIn){
//         next();
//     }
//     else {
//         res.redirect('/login-register')
//     }
// }

/* -------------------------------------------------------------------------- */
/*                            get landing/homepage                            */
/* -------------------------------------------------------------------------- */

const homepage=(req,res)=>{
    // let users=req.session.user
  adminhelper.viewProducts().then((product)=>{
   adminhelper.viewCategory().then((category)=>{
    res.render('user/index', {product,category});
   })
  
  })
 

}

/* -------------------------------------------------------------------------- */
/*                                  get login                                 */
/* -------------------------------------------------------------------------- */

const getLogin = (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/')
    } else{
        res.render('user/login-register',{"loginErr":req.session.loggedErrs})
        req.session.loggedErrs=false
    }

    // res.render('user/login-register')
}

/* -------------------------------------------------------------------------- */
/*                                 post login                                 */
/* -------------------------------------------------------------------------- */

const postLogin = (req, res) => {

    userhelper.doLogin(req.body).then((response) => {
        if (response.status) {
            req.session.loggedIn=true;
            req.session.user = response.user
            res.redirect('/')
        } else {
            req.session.loginErrs=true;
            res.redirect('/login')
        }
    })

}


/* -------------------------------------------------------------------------- */
/*                           User Login and Register                          */
/* -------------------------------------------------------------------------- */

const getLoginRegister = (req, res) => {
    res.render('user/login-register')
}


const getSignUp=(req,res)=>{
    res.render('user/login-register')
}


/* -------------------------------------------------------------------------- */
/*                                 user Signup                                */
/* -------------------------------------------------------------------------- */

const postSignup = (req, res, next) => {

    userhelper.doSignup(req.body).then((response) => {
        if (response.status) {
            // response.user.status = true

            // console.log(req.body)

            res.redirect('/signup')
        }
        else {
            console.log(response.status)
            res.redirect('/login')
        }
    })

}
 /* -------------------------------------------------------------------------- */
 /*                              getProductDetails                             */
 /* -------------------------------------------------------------------------- */

 const getproductsDetails=(req,res,next)=>{
    let proId= req.params.id
    console.log(proId)
    userhelper.Viewproductdetail(req.params.id).then((data)=>{
        res.render('user/productDetails',data)
    })
        
    }

 /* -------------------------------------------------------------------------- */
 /*                                  404 Page                                  */
 /* -------------------------------------------------------------------------- */

 const nodata=(req,res)=>{
    res.render('404page')
 }

 /* -------------------------------------------------------------------------- */
 /*                                  get cart                                  */
 /* -------------------------------------------------------------------------- */

 const getcart=(req,res)=>{
    res.render('user/cart')
}

/* -------------------------------------------------------------------------- */
/*                                get checkout                                */
/* -------------------------------------------------------------------------- */

const getcheckout=(req,res)=>{
    res.render('user/checkout')
}

/* -------------------------------------------------------------------------- */
/*                                   GET OTP                                  */
/* -------------------------------------------------------------------------- */

const getOtp=(req,res)=>{
    res.render('user/otp')
}

/* -------------------------------------------------------------------------- */
/*                                get Confirm OTP                             */
/* -------------------------------------------------------------------------- */

const confirmOtp=(req,res)=>{
    res.render('user/confirmotp')
}
/* -------------------------------------------------------------------------- */
/*                                  Post OTP                                  */
/* -------------------------------------------------------------------------- */

let signupData
const postOtp=(req,res)=>{
    userhelper.doOTP(req.body).then((response)=>{
        if(response.status){
            signupData=response.user
            res.redirect('/confirmotp')
        }
        else{
            res.redirect('/otp')
        }
    })
}
/* -------------------------------------------------------------------------- */
/*                              POST Confirm OTP                              */
/* -------------------------------------------------------------------------- */

const postconfirmOtp=(req,res)=>{
    userhelper.doOTPconfirm(req.body,signupData).then((response)=>{
        if(response.status){
        
            res.redirect('/')
        }
        else{
            res.redirect('/confirmotp')
        }
    })
}
 
module.exports = { getLogin, getLoginRegister, postSignup, postLogin,getproductsDetails,homepage,nodata,getcart,
    getcheckout,getOtp,confirmOtp,postOtp,postconfirmOtp,getSignUp }