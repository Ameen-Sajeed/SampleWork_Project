
/* -------------------------------------------------------------------------- */
/*                                 add to Cart                                */
/* -------------------------------------------------------------------------- */



function addtocart(proId) {
    $.ajax({
        url: '/addtocart/' + proId,
        method: 'get',
        success: (response) => {
            if (response.status) {
                let count = $('#cart-count').html()
                count = parseInt(count) + 1
                $('#cart-count').html(count)
            }
            swal({
                title: "Product is added!",
                text: "You have added to you cart !",
                icon: "success",
                button: "OK!",
            });
        }
    })
}


/* -------------------------------------------------------------------------- */
/*                           Change quantity of Cart                          */
/* -------------------------------------------------------------------------- */

function changeQuantity(cartId, proId, userId, count) {

    event.preventDefault()
    let quantity = parseInt(document.getElementById(proId).innerHTML)
    count = parseInt(count)
    console.log(count);

    $.ajax({
        url: '/change-product-quantity',
        data: {
            cart: cartId,
            product: proId,
            count: count,
            quantity: quantity,
            user: userId
        },
        method: 'post',
        success: (response) => {
            console.log(response);
            if (response.removeProduct) {
                alert('Product Removed from cart')
                location.reload()
            }
            else {
                document.getElementById('a' + proId).innerHTML = response.subtotal

                document.getElementById(proId).innerHTML = quantity + count
                document.getElementById('total').innerHTML = response.total
                // console.log('a'+proId,'iuytfrerftgyhuj');


            }
        }
    })
}


/* -------------------------------------------------------------------------- */
/*                                checkout form                               */
/* -------------------------------------------------------------------------- */

$('#checkout-form').submit((e) => {
    e.preventDefault()

    swal({
        title: "Are you sure?",
        text: "Please Confirm Your Order !",
        icon: "success",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: '/checkout',
                    method: 'post',
                    data: $('#checkout-form').serialize(),
                    success: (response) => {
                        // alert(response)
                        // window.location=response.message

                        if (response.codSuccess) {
                            swal("Order Placed ! ordered succesfully !", {
                                icon: "success",

                                
                            });
                            location.href='/ordersuccess'

                        }
                        else if(response.razorPay) 
                        {
                            razorpayPayment(response)
                        }
                        else if(response.payPal){

                            for(let i =0; i < response.links.length; i++) {

                                if(response.links[i].rel === "approval_url"){

                                    location.href= response.links[i].href;

                                }


                            }

                            // location.href='/ordersuccess'



                        }


                    }

                })


            } else {
                swal("Order not placed!");
            }
        });


})


/* -------------------------------------------------------------------------- */
/*                           delete products in Cart                          */
/* -------------------------------------------------------------------------- */


function deleteItem(cartId, proId) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: '/delete-cart-items',
                    data: {
                        cart: cartId,
                        product: proId
                    },

                    method: 'post',
                    success: (response) => {
                        swal("Poof! Your product has been deleted!", {
                            icon: "success",
                        });

                        location.reload()
                    }
                })


            } else {
                swal("Your product is safe!");
            }
        });

}

/* -------------------------------------------------------------------------- */
/*                               Razor Paymenet                               */
/* -------------------------------------------------------------------------- */

function razorpayPayment(order) {
    var options = {
        "key": "rzp_test_msmwm7MIJkbUbi", // Enter the Key ID generated from the Dashboard
        "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Harvest",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)


            verifyPayment(response, order)
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
}


/* -------------------------------------------------------------------------- */
/*                             Verify RazorPayment                            */
/* -------------------------------------------------------------------------- */

function verifyPayment(payment,order) {

    $.ajax({
        url: '/verify-payment',
        data: {
            payment,
            order
        },

        method: 'post',
        success:(response)=>{
            if(response.status){

                location.href='/ordersuccess'
            }
            else{
                swal('Payment Failed BRO!')
            }
        }

    })

}