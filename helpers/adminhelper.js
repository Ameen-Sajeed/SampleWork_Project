var db = require('../config/connection')
var collection = require('../config/collection')
var bcrypt = require('bcrypt')
var objectId = require('mongodb').ObjectId


module.exports = {

  /* -------------------------------------------------------------------------- */
  /*                                 view Users                                 */
  /* -------------------------------------------------------------------------- */
  viewUsers: (data) => {
    return new Promise(async (resolve, reject) => {
      let data = await db.get().collection(collection.USERCOLLECTION).find().toArray()
      resolve(data)
      console.log(data._id)
    })
  },

  /* -------------------------------------------------------------------------- */
  /*                                 block User                                 */
  /* -------------------------------------------------------------------------- */

  blockUser: (proId) => {
    return new Promise(async (resolve, reject) => {
      await db.get().collection(collection.USERCOLLECTION).updateOne({ _id: objectId(proId) }, { $set: { state: "blocked" } }).then((data) => {
        console.log(data)
        resolve(data)
      })
    })
  },


  /* -------------------------------------------------------------------------- */
  /*                                unblock User                                */
  /* -------------------------------------------------------------------------- */
  unblockUser: (proId) => {
    return new Promise(async (resolve, reject) => {
      await db.get().collection(collection.USERCOLLECTION).updateOne({ _id: objectId(proId) }, { $set: { state: "active" } }).then((data) => {
        console.log(data)
        resolve(data)
      })
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
  /*                                 Add Product                                */
  /* -------------------------------------------------------------------------- */

  addproduct: (productData) => {
    return new Promise(async (resolve, reject) => {
      let data = await db.get().collection(collection.PRODUCTCOLLECTION).insertOne(productData)
      resolve(data)
      // console.log(data)
    })
  },


  /* -------------------------------------------------------------------------- */
  /*                               delete Product                               */
  /* -------------------------------------------------------------------------- */

  deleteproduct: (delId) => {
    return new Promise(async (resolve, reject) => {
      await db.get().collection(collection.PRODUCTCOLLECTION).deleteOne({ _id: objectId(delId) }).then((data) => {

        console.log(data)
        resolve(data)

      })

    })
  },

  /* -------------------------------------------------------------------------- */
  /*                               update Product                               */
  /* -------------------------------------------------------------------------- */
  updateProduct: (Id, product) => {
    // console.log(Id);
    return new Promise(async (resolve, reject) => {
      await db.get().collection(collection.PRODUCTCOLLECTION).updateOne({ _id: objectId(Id) }, {
        $set: {
          name: product.name,
          index: product.index,
          category: product.category,
          price: product.price,
          inventory: product.inventory,
          description: product.description,
          image:product.image
        }
      }).then((data) => {
        // console.log(data);
        resolve(data)
      })
    })
  },


  /* -------------------------------------------------------------------------- */
  /*                              getUpdateProduct                              */
  /* -------------------------------------------------------------------------- */

  ViewUpdateproduct: (Id) => {
    return new Promise(async (resolve, reject) => {
      let data = await db.get().collection(collection.PRODUCTCOLLECTION).findOne({ _id: objectId(Id) })
      resolve(data)
    })
  },

  /* -------------------------------------------------------------------------- */
  /*                               delete Category                              */
  /* -------------------------------------------------------------------------- */
  deletecategory: (catId) => {
    return new Promise(async (resolve, reject) => {
      await db.get().collection(collection.CATEGORYCOLLECTION).deleteOne({ _id: objectId(catId) }).then((data) => {

        console.log(data)
        resolve(data)

      })

    })
  },


  /* -------------------------------------------------------------------------- */
  /*                                Add Category                                */
  /* -------------------------------------------------------------------------- */

  addcategory: (categoryData) => {
    return new Promise(async (resolve, reject) => {
      let data = await db.get().collection(collection.CATEGORYCOLLECTION).insertOne(categoryData)
      resolve(data)
      console.log(data)
    })
  },
  /* -------------------------------------------------------------------------- */
  /*                                View Category                               */
  /* -------------------------------------------------------------------------- */

  viewCategory: (category) => {
    return new Promise(async (resolve, reject) => {
      let category = await db.get().collection(collection.CATEGORYCOLLECTION).find().toArray()
      resolve(category)
      console.log(category)
    })
  },

  /* -------------------------------------------------------------------------- */
  /*                                 view Banner                                */
  /* -------------------------------------------------------------------------- */

viewBanner: (banner)=>{
  return new Promise(async (resolve,reject)=>{
    let banner = await db.get().collection(collection.BANNERCOLLECTION).find().toArray()
    resolve(banner)
    console.log(banner)
  })
},

/* -------------------------------------------------------------------------- */
/*                                 Add Banner                                 */
/* -------------------------------------------------------------------------- */

addBanner: (banner) => {

  return new Promise(async (resolve, reject) => {
    let data = await db.get().collection(collection.BANNERCOLLECTION).insertOne(banner)
    resolve(data)
    // console.log(data)
  })
},

/* -------------------------------------------------------------------------- */
/*                              getUpdate Banner                              */
/* -------------------------------------------------------------------------- */

ViewUpdateBanner: (Id) => {
  return new Promise(async (resolve, reject) => {
    let data = await db.get().collection(collection.BANNERCOLLECTION).findOne({ _id: objectId(Id) })
    resolve(data)
  })
},


/* -------------------------------------------------------------------------- */
/*                                Update Banner                               */
/* -------------------------------------------------------------------------- */

updateBanner: (Id, banner) => {
  console.log(Id);
  return new Promise(async (resolve, reject) => {
    await db.get().collection(collection.BANNERCOLLECTION).updateOne({ _id: objectId(Id) }, {
      $set: {
        name: banner.name,
        index: banner.index,
        description: banner.description
      }
    }).then((data) => {
      console.log(data);
      resolve(data)
    })
  })
},

/* -------------------------------------------------------------------------- */
/*                                delete Banner                               */
/* -------------------------------------------------------------------------- */

deleteBanner: (delId) => {
  return new Promise(async (resolve, reject) => {
    await db.get().collection(collection.BANNERCOLLECTION).deleteOne({ _id: objectId(delId) }).then((data) => {

      console.log(data)
      resolve(data)

    })

  })
},


}



