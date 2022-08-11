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

        // View product

        viewProducts:(product)=>{
          return new Promise(async(resolve,reject)=>{
            let product = await db.get().collection(collection.PRODUCTCOLLECTION).find().toArray()
            resolve(product)
            console.log(product)
          })
        },



        // Add Product

        addproduct:(productData)=>{
            return new Promise(async(resolve,reject)=>{
                let data =await db.get().collection(collection.PRODUCTCOLLECTION).insertOne(productData)
                    resolve(data)
                    // console.log(data)
                })
            },

           
                    // delete Product

                    deleteproduct:(delId)=>{
                      return new Promise(async(resolve,reject)=>{
                          await db.get().collection(collection.PRODUCTCOLLECTION).deleteOne({_id:objectId(delId)}).then((data)=>{
                             
                            console.log(data)
                            resolve(data)
        
                          })
                             
                          })
                      },
          
              // delete Category
              deletecategory:(catId)=>{
                return new Promise(async(resolve,reject)=>{
                    await db.get().collection(collection.CATEGORYCOLLECTION).deleteOne({_id:objectId(catId)}).then((data)=>{
                       
                      console.log(data)
                      resolve(data)
  
                    })
                       
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
                  // View Category
  
                  viewCategory:(category)=>{
                    return new Promise(async(resolve,reject)=>{
                      let category = await db.get().collection(collection.CATEGORYCOLLECTION).find().toArray()
                      resolve(category)
                      console.log(category)
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
                  },
        





    }



