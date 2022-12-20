var updateBtns = document.getElementsByClassName('update-cart')

for (var i = 0; i < updateBtns.length; i++) {
    updateBtns[i].addEventListener('click', function(){
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('productId:',productId, 'action:',action)

        /* checking user status on click */
        console.log('USER:', user)
        if (user === 'AnonymousUser'){
            addCookieItem(productId, action)
        }else{
            updateUserOrder(productId, action)/* passing the function updateuserorder so it gets called when the user is logged */
        }
    })
}


function addCookieItem(productId, action){
    console.log('Not logged in...')

    if(action == 'add'){
        if(cart[productId] == undefined ){
            cart[productId] = {'quantity': 1}
        }else{
            cart[productId]['quantity']+= 1
        }
    }
    if(action == 'remove'){
        cart[productId]['quantity'] -= 1

        if(cart[productId]['quantity'] <= 0){
            console.log('Remove Item')
            delete cart[productId]
        }
    }
    console.log('Cart:', cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain;path=/"
    location.reload()
}

/* defining the function with 2 parameters : productId, action  */
function updateUserOrder(productId, action){
    console.log('User is logged, sending data...')

    var url = '/update_item'
    /* create and use the fetch API to sent a post request */
    fetch(url,
        {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'productId':productId, 'action':action}) /* converting and sending our productId and action as a json object */
    })
    .then((responce) => {
        return responce.json();
    })
    .then((data) =>{
        console.log('data:',data)
        location.reload()
    })
}