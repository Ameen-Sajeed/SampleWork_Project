var db = require('../config/connection')
var collection = require('../config/collection')
var bcrypt = require('bcrypt')


module.exports = {

    doSignup: (userData) => {
        console.log(userData);  

        let response = {}
        return new Promise(async (resolve, reject) => {
            let email = await db.get().collection(collection.USERCOLLECTION).findOne({ email: userData.email })
    

            if (email) {
                response.status = true;
                console.log(response);
                resolve(response)

            } else {
        
                    userData.password = await bcrypt.hash(userData.password,10)
                    db.get().collection(collection.USERCOLLECTION).insertOne(userData).then((data) => {
                        resolve(data.insertedId)
                        resolve({ status: false })          

                    })
                    
               

        }
        })


    },

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            console.log(userData)
            let user = await db.get().collection(collection.USERCOLLECTION).findOne({ email: userData.email })
            let check = await db.get().collection(collection.USERCOLLECTION).findOne({ state: true })
            console.log(user);
            if (user && check) {
                console.log(user);
                bcrypt.compare(userData.Password, user.password).then((status) => {
                    console.log(status);
                    if (status) {
                        console.log("login sucess")
                        response.user = user;
                        response.user.status=true
                        response.status = true;
                        resolve(response)
                    }
                    else {
                        console.log("login failed")
                        resolve({ status: false });
                    }
                })
            } else {
                console.log("user not found")
                resolve.status = false;
            }
        })
    }
}

    
    



