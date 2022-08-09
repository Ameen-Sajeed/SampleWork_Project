var db=require('../config/connection')
var collection=require('../config/collection')



module.exports={
    viewUsers:(data)=>{
        return new Promise(async(resolve,reject)=>{
            let data =await db.get().collection(collection.USERCOLLECTION).find().toArray()
                resolve(data)
                console.log(data._id)
            })
        },
        addproduct:(productData)=>{
            return new Promise(async(resolve,reject)=>{
                let data =await db.get().collection(collection.PRODUCTCOLLECTION).insertOne(productData)
                    resolve(data)
                    console.log(data)
                })
            },
            addcategory:(categoryData)=>{
                return new Promise(async(resolve,reject)=>{
                    let data =await db.get().collection(collection.CATEGORYCOLLECTION).insertOne(categoryData)
                        resolve(data)
                        console.log(data)
                    })
                }
        


    }



