const db = require('../config/connection')
const collection = require('../config/collection')
const bcrypt = require('bcrypt')
const objectId = require('mongodb').ObjectId
const otp=require('../config/otp')
const { serviceID } = require('../config/otp')
const client= require('twilio')(otp.accountSID,otp.authToken)


module.exports = {

    /* -------------------------------------------------------------------------- */
    /*                                 User SignUp                                */
    /* -------------------------------------------------------------------------- */

    doSignup: (userData) => {
        console.log(userData);

        let response = {}
        return new Promise(async (resolve, reject) => {
            let email = await db.get().collection(collection.USERCOLLECTION).findOne({ email: userData.email })
            // let phone = await db.get().collection(collection.USERCOLLECTION).findOne({ phone: userData.phone })


            if (email) {
                response.status = true;
                console.log(response);
                resolve(response)

            }

            else {


                userData.state = "active";
                userData.password = await bcrypt.hash(userData.password, 10)
                db.get().collection(collection.USERCOLLECTION).insertOne(userData).then((data) => {
                    resolve(data.insertedId)

                })
                resolve({ status: false })




            }
        })


    },

    /* -------------------------------------------------------------------------- */
    /*                                 User Login                                 */
    /* -------------------------------------------------------------------------- */

    doLogin: (userData) => {
            let response = {}
            let loginStatus = false
            userData.state ='active'
            return new Promise(async (resolve, reject) => {

            let user = await db.get().collection(collection.USERCOLLECTION).findOne({$and: [{email: userData.email },{state:userData.state}]})

           
                if (user) {
                    console.log(user);
                    bcrypt.compare(userData.Password, user.password).then((status) => {
                        console.log(status);
                        if (status) {
                            console.log('login-success')
                            response.user = user;
                            response.user.status = true
                            response.status = true;
                            resolve(response)
                        }
                        else {
            
                            resolve({ status: false })
                        }
                    })

                }
                else {
                    response.status = false
                    resolve(response)
                }
            
        })


    },

    /* -------------------------------------------------------------------------- */
    /*                                View product                                */
    /* -------------------------------------------------------------------------- */

    viewProducts: (product) => {
        return new Promise(async (resolve, reject) => {
            let product = await db.get().collection(collection.PRODUCTCOLLECTION).find().toArray()
            resolve(product)
            console.log(product)
        })
    },


    /* -------------------------------------------------------------------------- */
    /*                               Product detail                               */
    /* -------------------------------------------------------------------------- */

    Viewproductdetail: (proId) => {
        return new Promise(async (resolve, reject) => {
            let data = await db.get().collection(collection.PRODUCTCOLLECTION).findOne({ _id: objectId(proId) })
            console.log(data)
            resolve(data)

        })
    },

/* -------------------------------------------------------------------------- */
/*                                Generate OTP                                */
/* -------------------------------------------------------------------------- */

doOTP:(userData) =>{
    let response={}
    return new Promise(async(resolve,reject)=>{
        let user= await db.get().collection(collection.USERCOLLECTION).findOne({ phone: userData.phone })
    
        if(user){
            response.status= true
            response.user=user
              client.verify.services(otp.serviceID)
                .verifications
                .create({to: `+91${userData.phone}`, channel: 'sms'})
                .then((verification) =>{

                });   
                console.log(response);
                resolve(response)

        }
        else{
            response.status=false;
            resolve(response)
           


        }
    })
},


/* -------------------------------------------------------------------------- */
/*                                 Confirm OTP                                */
/* -------------------------------------------------------------------------- */

doOTPconfirm:(confirmOtp,userData)=>{
    console.log('hello');
    console.log(userData);
    console.log(confirmOtp);

    return new Promise((resolve,reject)=>

    {

        client.verify.services(otp.serviceID)
        .verificationChecks
        .create({
            to: `+91${userData.phone}`,
             code: confirmOtp.phone
            })
        .then((data) => {
            if(data.status == 'approved'){
                resolve({status:true})
            }
            else {
                resolve({status:false})
            }

        })

    })
    
}




}
