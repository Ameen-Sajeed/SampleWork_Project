const { response } = require("express")
const { MongoClient } = require("mongodb")
const adminhelper = require("../helpers/adminhelper")
const userhelper = require("../helpers/userhelper")
const { doSignup } = require("../helpers/userhelper")
const paypal = require('paypal-rest-sdk')




/* -------------------------------------------------------------------------- */
/*                            get landing/homepage                            */
/* -------------------------------------------------------------------------- */
let user
const homepage = async (req, res) => {
    user = req.session.user
    var cartcount
    if (req.session.user) {
        cartcount = await userhelper.getCartCount(req.session.user._id)
    }
    adminhelper.viewProducts().then((product) => {
        adminhelper.viewCategory().then((category) => {
            adminhelper.viewBanner().then((banner) => {
                res.render('user/index', { product, category, user, cartcount, banner });

            })
        })

    })


}

/* -------------------------------------------------------------------------- */
/*                                  get login                                 */
/* -------------------------------------------------------------------------- */

const getLogin = (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
    } else {
        res.render('user/login-register', { "loginErr": req.session.loggedErrs })
        req.session.loggedErrs = false
    }

    // res.render('user/login-register')
}

/* -------------------------------------------------------------------------- */
/*                                 post login                                 */
/* -------------------------------------------------------------------------- */

const postLogin = (req, res) => {

    userhelper.doLogin(req.body).then((response) => {
        if (response.status) {
            req.session.loggedIn = true;
            req.session.user = response.user
            res.redirect('/')
        } else {
            req.session.loginErrs = true;
            res.redirect('/login')
        }
    })

}

/* -------------------------------------------------------------------------- */
/*                                   Log Out                                  */
/* -------------------------------------------------------------------------- */

const logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}


/* -------------------------------------------------------------------------- */
/*                           User Login and Register                          */
/* -------------------------------------------------------------------------- */

const getLoginRegister = (req, res) => {
    res.render('user/login-register')
}


const getSignUp = (req, res) => {
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

const getproductsDetails = (req, res, next) => {
    let proId = req.params.id
    console.log(proId)
    userhelper.Viewproductdetail(req.params.id).then((data) => {
        res.render('user/productDetails', data)
    })

}

/* -------------------------------------------------------------------------- */
/*                                  404 Page                                  */
/* -------------------------------------------------------------------------- */

const nodata = (req, res) => {
    res.render('404page')
}

/* -------------------------------------------------------------------------- */
/*                                  get cart                                  */
/* -------------------------------------------------------------------------- */
const getcart = async (req, res, next) => {
    let subtotal;
    let products = await userhelper.viewCartProducts(req.session.user._id)
    let totalValue=0;
    if(products.length>0){
        totalValue = await userhelper.getTotalAmount(req.session.user._id)

    }
    console.log("hjjhdsgjgf");
    console.log(products);

    subtotal = await userhelper.getSubTotalAmount(req.session.user._id)
    for (var i = 0; i < products.length; i++) {
        products[i].subTotal = subtotal[i].suBtotal
    }

    console.log(subtotal);
    console.log(user)
    res.render('user/cart', { products, user, totalValue })


}

/* -------------------------------------------------------------------------- */
/*                                 add to Cart                                */
/* -------------------------------------------------------------------------- */

const addtocart = (req, res) => {
    console.log(req.params.id);

    userhelper.addtoCarts(req.params.id, req.session.user._id).then(() => {


        res.json({ status: true })
        // res.redirect('/')
        // res.send('hai cart')
    })

}

/* -------------------------------------------------------------------------- */
/*                                 delete Cart                                */
/* -------------------------------------------------------------------------- */

const deleteCart = (req, res) => {
    userhelper.deleteCartItems(req.body).then((response) => {
        res.json(response)
    })

}


/* -------------------------------------------------------------------------- */
/*                                get checkout                                */
/* -------------------------------------------------------------------------- */

const getcheckout = async (req, res) => {

    let total = await userhelper.getTotalAmount(req.session.user._id)

    res.render('user/checkout', { total, user: req.session.user })
}


/* -------------------------------------------------------------------------- */
/*                                post checkout                               */
/* -------------------------------------------------------------------------- */

const postcheckout = async (req, res) => {
    let products = await userhelper.getCartProductList(req.body.userId)

    let totalPrice = await userhelper.getTotalAmount(req.body.userId)
    console.log(products);

    userhelper.placeOrder(req.body, products, totalPrice).then((orderId) => {

        if(req.body['payment-method']==='COD'){
            res.json({codSuccess:true})

        } else if(req.body['payment-method']==='RAZORPAY') {
            userhelper.generateRazorpay(orderId,totalPrice).then((response)=>{
                response.razorPay = true;
                res.json(response)
            })
        }

        else if(req.body['payment-method'] ==='PAYPAL'){
            console.log('vjhdbfjbfh');
            userhelper.generatePayPal(orderId,totalPrice).then((response)=>{
                response.payPal = true;
                res.json(response)
            })
        }


    })

    console.log(req.body);

}

/* -------------------------------------------------------------------------- */
/*                                   GET OTP                                  */
/* -------------------------------------------------------------------------- */

const getOtp = (req, res) => {
    res.render('user/otp')
}

/* -------------------------------------------------------------------------- */
/*                                get Confirm OTP                             */
/* -------------------------------------------------------------------------- */

const confirmOtp = (req, res) => {
    res.render('user/confirmotp')
}
/* -------------------------------------------------------------------------- */
/*                                  Post OTP                                  */
/* -------------------------------------------------------------------------- */

let signupData
const postOtp = (req, res) => {
    userhelper.doOTP(req.body).then((response) => {
        if (response.status) {
            signupData = response.user
            res.redirect('/confirmotp')
        }
        else {
            res.redirect('/otp')
        }
    })
}
/* -------------------------------------------------------------------------- */
/*                              POST Confirm OTP                              */
/* -------------------------------------------------------------------------- */

const postconfirmOtp = (req, res) => {
    userhelper.doOTPconfirm(req.body, signupData).then((response) => {
        if (response.status) {
            req.session.loggedIn = true;
            req.session.user = signupData

            res.redirect('/')
        }
        else {
            res.redirect('/confirmotp',)
        }
    })
}

/* -------------------------------------------------------------------------- */
/*                         view   Orders in User Profile                      */
/* -------------------------------------------------------------------------- */

const getProfile = async(req, res) => {
   let orders= await userhelper.viewOrders(req.session.user._id)
        res.render('user/userProfile',{orders,user})

    }



 /* -------------------------------------------------------------------------- */
 /*                       View Ordered Products For user                       */
 /* -------------------------------------------------------------------------- */


 const orderProducts=async(req,res)=>{
    let products= await userhelper.getOrderProduct(req.params.id)
    res.render('user/orderProducts',{products,user})
 }


/* -------------------------------------------------------------------------- */
/*                           change product Quantity                          */
/* -------------------------------------------------------------------------- */


const changeproductquantity = (req, res, next) => {
    console.log(req.body);


    userhelper.changeProductQuantity(req.body).then(async (response) => {
        console.log('response');
        console.log(response);
        response.total = await userhelper.getTotalAmount(req.body.user)
        response.subtotal = await userhelper.getSubTotal(req.body)

        // response.total=data

        res.json(response)

    })


}



const vegetables = (req, res) => {
    //  let subtotal= await userhelper.getSubTotalAmount(req.session.user._id)

    res.render('user/veg')
}



const orderplaced=(req,res)=>{
    res.render('user/orderplaced')
}


const verifyPayment=(req,res)=>{
    console.log(req.body);
    userhelper.verifyPayment(req.body).then(()=>{
        userhelper.changePaymentStatus(req.body['order[receipt]']).then(()=>{
            console.log('payment success');
            res.json({status:true})
        })

    }).catch((err)=>{
        res.json({status:false,errMsg:"Payment Failed"})
    })
}

module.exports = {
    getLogin, getLoginRegister, postSignup, postLogin, getproductsDetails, homepage, nodata, getcart,
    getcheckout, getOtp, confirmOtp, postOtp, postconfirmOtp, getSignUp, addtocart, logout, getProfile,
    changeproductquantity, vegetables, postcheckout, deleteCart,orderplaced,verifyPayment,orderProducts
}