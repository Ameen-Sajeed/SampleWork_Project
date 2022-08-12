const { response } = require("express")
const { MongoClient } = require("mongodb")
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
// // get login


const getLogin=(req,res)=>{
    // if(req.session.loggedIn){
    //     res.redirect('/')
    // } else{
    //     res.render('login-register')
    // }

    res.render('login-register')
}

// post login

const postLogin=(req,res)=>{

    userhelper.doLogin(req.body).then((response)=>{ 
        if(response.status){
            req.session.Loggedln=true;
            req.session.user=response.user
            res.redirect('/')
        } else {
            // req.session.loginErr=true;
            res.render('login-register')
        }
    })

}
// get homepage

const getHomePage=(req,res)=>{
    res.render('HomePage')
}


// User Login and Register

const getLoginRegister=(req,res)=>{
    res.render('login-register')
}


// user Signup
const postSignup=(req,res,next)=>{

    userhelper.doSignup(req.body).then((response)=>{
        if(response.status){
         response.user.status=true

            console.log(req.body)

            res.redirect('/login-register')
        }
        else {
            console.log(response.status)
            res.redirect('/login-register')
        }
    })
 
}
// User otp

const getotp=(req,res)=>{
    res.render('otp')
}

module.exports={getLogin,getLoginRegister,postSignup,postLogin,getHomePage,getotp}