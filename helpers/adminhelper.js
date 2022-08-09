var db=require('../config/connection')
var collection=require('../config/collection')
var bcrypt=require('bcrypt')
var objectId=require('mongodb').ObjectId


module.exports={

    // View Users

    viewUsers:(data)=>{
        return new Promise(async(resolve,reject)=>{
            let data =await db.get().collection(collection.USERCOLLECTION).find().toArray()
                resolve(data)
                console.log(data._id)
            })
        },

        // Add Product

        addproduct:(productData)=>{
            return new Promise(async(resolve,reject)=>{
                let data =await db.get().collection(collection.PRODUCTCOLLECTION).insertOne(productData)
                    resolve(data)
                    console.log(data)
                })
            },

            // Add Category

            addcategory:(categoryData)=>{
                return new Promise(async(resolve,reject)=>{
                    let data =await db.get().collection(collection.CATEGORYCOLLECTION).insertOne(categoryData)
                        resolve(data)
                        console.log(data)
                    })
                },
                  
                // block User

                blockUser:(proId)=>{
                    return new Promise(async(resolve,reject)=>{
                      await db.get().collection(collection.USERCOLLECTION).updateOne({_id:objectId(proId)},{$set:{state:false}}).then((data)=>{
                        console.log(data)
                        resolve(data)
                      })
                    })
                  },
              

                  // unblock User
                  unblockUser:(proId)=>{
                    return new Promise(async(resolve,reject)=>{
                      await db.get().collection(collection.USERCOLLECTION).updateOne({_id:objectId(proId)},{$set:{state:true}}).then((data)=>{
                        console.log(data)
                        resolve(data)
                      })
                    })
                  }
        


    }



