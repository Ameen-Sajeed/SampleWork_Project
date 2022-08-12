var db = require('../config/connection')
var collection = require('../config/collection')
var bcrypt = require('bcrypt')
var objectId=require('mongodb').ObjectId

//  const client = require('twilio')('AC9bf3b681920a0d9970eaa94755ecd1f6','55dae365e6c6120c5d66a38d3c44d842');


module.exports = {

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

                // client.verify.v2.services('VA25af488541672fc2173213a8934435b5')
                // .verifications
                // .create({to: '+15017122661', channel: 'sms'})
                // .then(verification => console.log(verification.status));


                userData.state = true;
                userData.password = await bcrypt.hash(userData.password, 10)
                db.get().collection(collection.USERCOLLECTION).insertOne(userData).then((data) => {
                    resolve(data.insertedId)

                })
                resolve({ status: false })




            }
        })


    },

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => { 
            let response = {}
            let loginStatus = false
            let user = await db.get().collection(collection.USERCOLLECTION).findOne({ email: userData.email })
            let check = await db.get().collection(collection.USERCOLLECTION).findOne({ state: true })
            if (user && check) {
                console.log(user);
                bcrypt.compare(userData.Password, user.password).then((status) => {
                    console.log(status);
                    if(status){
                     console.log('login-success')
                     response.user= user;
                     response.user.status=true   
                    response.status = true;
                    resolve(response)
                    }
                    else {
                        resolve({status:false})
                    }
                })

            }
            else {
                response.status = false
                resolve(response)
            }
        })


    },

     // View product

     viewProducts:(product)=>{
        return new Promise(async(resolve,reject)=>{
          let product = await db.get().collection(collection.PRODUCTCOLLECTION).find().toArray()
          resolve(product)
          console.log(product)
        })
      },


      // view ProductDetails

       // block User

       Viewproductdetail:(proId)=>{
        return new Promise(async(resolve,reject)=>{
          let data=await db.get().collection(collection.PRODUCTCOLLECTION).findOne({_id:objectId(proId)})
            console.log(data)
            resolve(data)
        
        })
      },
  
}





// // //
// // const client = require('twilio')(accountSid, authToken);

//  client.verify.v2.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
//                 .verifications
//                 .create({to: '+15017122661', channel: 'sms'})
//                 .then(verification => console.log(verification.status));

