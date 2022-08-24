
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
              });        }
    })
}


/* -------------------------------------------------------------------------- */
/*                           Change quantity of Cart                          */
/* -------------------------------------------------------------------------- */

function changeQuantity(cartId, proId, userId, count) {
 
    event.preventDefault()
    let quantity=parseInt(document.getElementById(proId).innerHTML)
     count=parseInt(count)
     console.log(count);

    $.ajax({
        url: '/change-product-quantity',
        data: {
            cart: cartId,
            product: proId,
            count: count,
            quantity:quantity,
            user:userId
        },
        method: 'post',
        success: (response) => {
            console.log(response);
            if(response.removeProduct){
                alert('Product Removed from cart')
                location.reload()
            }
            else
            {
                document.getElementById('a'+proId).innerHTML=response.subtotal

                document.getElementById(proId).innerHTML=quantity+count
                document.getElementById('total').innerHTML=response.total
                // console.log('a'+proId,'iuytfrerftgyhuj');


            }
        }
    })
}


/* -------------------------------------------------------------------------- */
/*                                checkout form                               */
/* -------------------------------------------------------------------------- */

$('#checkout-form').submit((e)=>{
    e.preventDefault()
    $.ajax({
        url:'/checkout',
        method:'post',
        data:$('#checkout-form').serialize(),
        success:(response)=>{
            // alert(response)
            window.location=response.message

        }
    })

})

function deleteItem(cartId,proId){
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
                url:'/delete-cart-items',
                data:{
                    cart:cartId,
                    product:proId
                },
        
                method:'post',
                success:(response)=>{
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