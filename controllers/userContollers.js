const { response } = require("express")
const { MongoClient } = require("mongodb")
const userhelper = require("../helpers/userhelper")
const { doSignup } = require("../helpers/userhelper")

// get login


const getLogin=(req,res)=>{
    res.send('hai')
}

// post login

const postLogin=(req,res)=>{

    userhelper.doLogin(req.body).then((response)=>{
        if(response.status){
            req.session.Loggedln=true;
            req.session.user=response.user
         
            res.redirect('/')
        } else {
            req.session.loginErr=true;
            res.send('error')
        }
    })

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

module.exports={getLogin,getLoginRegister,postSignup,postLogin}