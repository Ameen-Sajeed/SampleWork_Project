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

            res.send('login success')
        } else {
            req.session.loginErr=true;
            res.send('login failed')
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