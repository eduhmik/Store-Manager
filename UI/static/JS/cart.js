const login_alert = document.getElementById('login_alert');

function deleteBtn(carts_id) {
    var carts_id = carts_id
    var delete_btn = `
            <td>
                <button id='delete-product-btn' onclick='deleteItem(${carts_id})'>
                <img src="static/images/delete.png" height="30px" width="30px"></button>
            </td>
            `
    return delete_btn;
}

function addToCart(cart){
    let count_span = document.getElementById('cart-items');
    let items = JSON.parse(getCart())
    if (count_span.innerText === "") {
        count_span.innerText = items ? items.length : 0
    }
    var start = count_span.innerText
    var begin_count = Number(start) + 1
    count_span.innerHTML = begin_count
    count_span.className = "numberCircle"


    saveToCart(cart)

}


function saveToCart(cart){
    let items = []
    if (getCart() !== null){
        items = JSON.parse(getCart())
    }
    items.push(cart)
    localStorage.setItem("cart_items", JSON.stringify(items))
}

function getCart() {
    return localStorage.getItem('cart_items')
}

function removeCart() {
    return localStorage.removeItem('cart_items')
}

function checkout(items) {
    localStorage.setItem('checkout', JSON.stringify(items))
}

function removeCheckout(){
    localStorage.removeItem('checkout')
}

function updateCartTable(){
    removeCheckout()

    products = JSON.parse(getCart())
    var cart_collection = []

    if (products) {
        let product_set = new Set();
        let set = products.filter(item => !product_set.has(JSON.stringify(item)) ? product_set.add(JSON.stringify(item)) : false);

        cart_collection = set.map(function(item) {
           prod_count = products.filter(object => object.product_id === item.product_id).length;
           item.prod_count = prod_count

           item.total = item.price * item.prod_count;
           return item
       })
       checkout(cart_collection)
    } else {
        let message = "Cart is curently empty. Add items to cart"
        login_alert.innerHTML = message;
        login_alert.style.color = 'red';
    }

    let header = `
            <tr>
            <th>Carts_ID</th>
            <th>Products_name</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Seller</th>
            <th>Remove</th>
            </tr>
            `
            
            let table = document.getElementById("carts-table");
            table.innerHTML = header

            cart_collection.forEach(cart => {
                let delete_btn = deleteBtn(cart.carts_id)
                table.innerHTML += '<tr>' +
                '<td>' + cart.carts_id + '</td>' +
                '<td>' + cart.product_name + '</td>' +
                '<td>' + cart.quantity + '</td>' +
                '<td>' + cart.total + '</td>' +
                '<td>' + cart.seller + '</td>' +
                delete_btn +
                '</tr>'
            });
        }
window.onload = function(event) {
    if (document.getElementById("carts-table")){
        updateCartTable()
    }
}
if (document.getElementById("remove-cart")) {
    document.getElementById("remove-cart").addEventListener("click", removeItems)
}  

function removeItems(){
    setTimeout(() => {
        removeCart()
        let message = 'Cart checkout successful'
        login_alert.innerHTML = message;
        login_alert.style.color = 'green';
        login_alert.focus()
        //if request is successful
        window.location.href = "products.html"
    }, 1000)
}

