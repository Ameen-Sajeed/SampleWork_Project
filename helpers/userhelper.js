const db = require('../config/connection')
const collection = require('../config/collection')
const bcrypt = require('bcrypt')
const objectId = require('mongodb').ObjectId
const otp = require('../config/otp')
const { serviceID } = require('../config/otp')
const { response } = require('../app')
const { date } = require('@hapi/joi/lib/template')
const { details } = require('@hapi/joi/lib/errors')
const { ObjectId } = require('mongodb')
const client = require('twilio')(otp.accountSID, otp.authToken)


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


                userData.state = true;
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
        userData.state = true
        return new Promise(async (resolve, reject) => {

            let user = await db.get().collection(collection.USERCOLLECTION).findOne({ $and: [{ email: userData.email }, { state: userData.state }] })


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
            // console.log(product)
        })
    },


    /* -------------------------------------------------------------------------- */
    /*                               Product detail                               */
    /* -------------------------------------------------------------------------- */

    Viewproductdetail: (proId) => {
        return new Promise(async (resolve, reject) => {
            let data = await db.get().collection(collection.PRODUCTCOLLECTION).findOne({ _id: objectId(proId) })
            // console.log(data)
            resolve(data)

        })
    },

    /* -------------------------------------------------------------------------- */
    /*                                Generate OTP                                */
    /* -------------------------------------------------------------------------- */

    doOTP: (userData) => {
        let response = {}
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USERCOLLECTION).findOne({ phone: userData.phone })

            if (user) {
                response.status = true
                response.user = user
                client.verify.services(otp.serviceID)
                    .verifications
                    .create({ to: `+91${userData.phone}`, channel: 'sms' })
                    .then((verification) => {

                    });
                // console.log(response);
                resolve(response)

            }
            else {
                response.status = false;
                resolve(response)



            }
        })
    },


    /* -------------------------------------------------------------------------- */
    /*                                 Confirm OTP                                */
    /* -------------------------------------------------------------------------- */

    doOTPconfirm: (confirmOtp, userData) => {
        // console.log('hello');
        // console.log(userData);
        // console.log(confirmOtp);

        return new Promise((resolve, reject) => {

            client.verify.services(otp.serviceID)
                .verificationChecks
                .create({
                    to: `+91${userData.phone}`,
                    code: confirmOtp.phone
                })
                .then((data) => {
                    if (data.status == 'approved') {
                        // response.user = user;
                        // response.user.status = true
                        // // response.status = true;
                        resolve({ status: true })
                    }
                    else {
                        resolve({ status: false })
                    }

                })

        })

    },

    /* -------------------------------------------------------------------------- */
    /*                                 Add to Cart                                */
    /* -------------------------------------------------------------------------- */

    addtoCarts: (proId, userId) => {
        let proObj = {
            item: objectId(proId),
            quantity: 1
        }
        console.log(userId);
        return new Promise(async (resolve, reject) => {
            let usercart = await db.get().collection(collection.CARTCOLLECTION).findOne({ user: objectId(userId) })
            // console.log(usercart);
            if (usercart) {
                let proExist = usercart.products.findIndex(product => product.item == proId)
                console.log(proExist);
                if (proExist != -1) {
                    db.get().collection(collection.CARTCOLLECTION)
                        .updateOne({ user: objectId(userId), 'products.item': objectId(proId) },
                            {
                                $inc: { 'products.$.quantity': 1 }
                            }
                        ).then(() => {
                            resolve()
                        })

                }
                else {
                    db.get().collection(collection.CARTCOLLECTION)
                        .updateOne({ user: objectId(userId) },
                            {
                                $push: { products: proObj }

                            }

                        ).then((response) => {
                            resolve()

                        })


                }



            } else {
                let Cartobj = {
                    user: objectId(userId),
                    products: [proObj]
                }

                db.get().collection(collection.CARTCOLLECTION)

                    .insertOne(Cartobj).then((response) => {
                        resolve()
                    })
            }




        })
    },

    /* -------------------------------------------------------------------------- */
    /*                                  View Cart                                 */
    /* -------------------------------------------------------------------------- */

    viewCartProducts: (userId) => {
        return new Promise(async (resolve, reject) => {
            let cartItems = await db.get().collection(collection.CARTCOLLECTION).aggregate([

                {
                    $match: { user: objectId(userId) }
                },

                {
                    $unwind: '$products'
                },

                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }

                },
                {
                    $lookup: {
                        from: collection.PRODUCTCOLLECTION,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'

                    }
                },
                {
                    $project: {
                        item: 1,
                        quantity: 1,
                        product: { $arrayElemAt: ['$product', 0] }
                    }
                },

            ]).toArray()

            // console.log(cartItems[0].products)

            resolve(cartItems)
        })
    },

    /* -------------------------------------------------------------------------- */
    /*                              Count of the Cart                             */
    /* -------------------------------------------------------------------------- */

    getCartCount: (userId) => {
        return new Promise(async (resolve, reject) => {
            let count = 0;
            let cart = await db.get().collection(collection.CARTCOLLECTION).findOne({ user: objectId(userId) })

            if (cart) {

                count = cart.products.length;

            }
            resolve(count)
        })


    },
    changeProductQuantity: (details) => {
        details.count = parseInt(details.count)
        details.quantity = parseInt(details.quantity)
        console.log(details);

        return new Promise((resolve, reject) => {

            if (details.count == -1 && details.quantity == 1) {

                db.get().collection(collection.CARTCOLLECTION)
                    .updateOne({ _id: objectId(details.cart) },
                        {
                            $pull: { products: { item: objectId(details.product) } }

                        }

                    ).then((response) => {

                        resolve({ removeProduct: true })

                    })



            }
            else {



                db.get().collection(collection.CARTCOLLECTION)
                    .updateOne({ _id: objectId(details.cart), 'products.item': objectId(details.product) },
                        {
                            $inc: { 'products.$.quantity': details.count }
                        }
                    ).then((response) => {
                        resolve({ status: true })
                    })

            }
        })

    },

    getTotalAmount: (userId) => {
        console.log('userId');
        console.log(userId);
        return new Promise(async (resolve, reject) => {
            let total = await db.get().collection(collection.CARTCOLLECTION).aggregate([

                {
                    $match: { user: objectId(userId) }
                },

                {
                    $unwind: '$products'
                },

                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }

                },
                {
                    $lookup: {
                        from: collection.PRODUCTCOLLECTION,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'

                    }
                },
                {
                    $project: {
                        item: 1,
                        quantity: 1,
                        product: { $arrayElemAt: ['$product', 0] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: {
                                $multiply: [
                                    {

                                        $toInt: '$quantity'
                                    },
                                    {
                                        $toInt: '$product.price'
                                    }]
                            }

                        }
                    }
                }

            ]).toArray()
            console.log('hai guys');
            // console.log(total,"swedrfg");
            // console.log(total)

            resolve(total[0].total)
        })

    },

    placeOrder: (order, products, total) => {
        return new Promise((resolve, reject) => {
            // console.log(order,products,total);
            let status = order['payment-method'] == 'COD' ? 'placed' : 'pending'
            let orderObj = {
                deliveryDetails: {
                    name: order.name,
                    mobile: order.phone,
                    email: order.email,
                    address: order.address,
                    pincode: order.pincode

                },
                userId: objectId(order.userId),
                paymentMethod: order['payment-method'],
                products: products,
                totalAmount: total,
                date: new Date(),
                status: status
            }

            db.get().collection(collection.ORDERCOLLECTION).insertOne(orderObj).then((response) => {
                db.get().collection(collection.CARTCOLLECTION).deleteOne({ user: objectId(order.userId) })
                resolve()
            })
        })

    },

    getCartProductList: (userId) => {
        return new Promise(async (resolve, reject) => {
            let cart = await db.get().collection(collection.CARTCOLLECTION).findOne({ user: objectId(userId) })
            console.log('ammm');
            console.log(cart.products);
            resolve(cart.products)
        })
    },

    /* -------------------------------------------------------------------------- */
    /*                              product Sub total                             */
    /* -------------------------------------------------------------------------- */

    getSubTotalAmount: (userId) => {
        console.log('userId');
        console.log(userId);
        return new Promise(async (resolve, reject) => {
            let subtotal = await db.get().collection(collection.CARTCOLLECTION).aggregate([

                {
                    $match: { user: objectId(userId) }
                },

                {
                    $unwind: '$products'
                },

                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }

                },
                {
                    $lookup: {
                        from: collection.PRODUCTCOLLECTION,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'

                    }
                },
                {
                    $project: {
                       _id:0,
                        quantity: 1,
                        product: { $arrayElemAt: ['$product', 0] }
                    }
                },

                {
                    $project: {
                        suBtotal: {
                            $multiply: [
                                {

                                    $toInt: '$quantity'
                                },
                                {
                                    $toInt: '$product.price'
                                }]

                        }
                    }
                }



            ]).toArray()

            console.log(subtotal);
            resolve(subtotal)
        })






    },


    /* -------------------------------------------------------------------------- */
    /*                                 subtotal                               */
    /* -------------------------------------------------------------------------- */


    getSubTotal: (detail) => {

        return new Promise(async (resolve, reject) => {
            let subtotal = await db.get().collection(collection.CARTCOLLECTION).aggregate([
                {
                    $match: { user: ObjectId(detail.user) }
                },
                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                }
                , {

                    $match: { item: ObjectId(detail.product) }
                },
                {
                    $lookup: {
                        from: collection.PRODUCTCOLLECTION,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $project: {
                        _id: 0, quantity: 1, product: { $arrayElemAt: ["$product", 0] }

                    }
                },
                {
                    $project: {

                        //    total:{$sum:{$multiply:['$quantity','$product.price']}}
                        total: { $multiply: [{ $toInt: '$quantity' }, { $toInt: '$product.price' }] }

                    }
                }

            ]).toArray()
            console.log(subtotal);
            if(subtotal.length != 0){
                resolve(subtotal[0].total)
            }else{
                resolve()
            }

        })
    },




    /* -------------------------------------------------------------------------- */
    /*                                 Remove Cart                                */
    /* -------------------------------------------------------------------------- */

    deleteCartItems: (details) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(collection.CARTCOLLECTION).updateOne({ _id: objectId(details.cart) },

                {
                    $pull: { products: { item: objectId(details.product) } }



                }).then((response) => {
                    resolve(response)
                })

        })



    }
}
