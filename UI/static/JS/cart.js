const login_alert = document.getElementById('login_alert');

function deleteBtn(product_id) {
    var product_id = product_id
    var delete_btn = `
            <td>
                <button id='delete-product-btn' onclick='removeItem(${product_id})'>
                <img src="static/images/delete.png" height="30px" width="30px"></button>
            </td>
            `
    return delete_btn;
}

function addToCart(product){
    let count_span = document.getElementById('cart-items');
    let items = JSON.parse(getCart())
    if (count_span.innerText === "") {
        count_span.innerText = items ? items.length : 0
    }
    var start = count_span.innerText
    var begin_count = Number(start) + 1
    count_span.innerHTML = begin_count
    count_span.className = "numberCircle"


    saveToCart(product)

}


function saveToCart(product){
    var items = []
    if (getCart() !== null){
        items = JSON.parse(getCart())
        console.log(items)
    }
    items.push(product)
    console.log(product)
    localStorage.setItem("cart_items", JSON.stringify(items))
}

function getCart() {
    console.log(localStorage.getItem('cart_items'))
    return localStorage.getItem('cart_items')
}

function removeItem(product_id) {
        if (getCart() !== null){
            if (confirm("Are you sure you want to delete?")) {
            crt = JSON.parse(getCart())
            var position = crt.findIndex(x => x.product_id === product_id)
            crt.splice(position, 1);
            localStorage.setItem("cart_items", JSON.stringify(crt))
            }
        }
}

function removeCart() {
    if (confirm("Are you sure you want to clear cart items?")){
    return localStorage.removeItem('cart_items')}
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
    console.log(products)
    var cart_collection = []

    if (products) {
        let product_set = new Set();
        let set = products.filter(item => !product_set.has(JSON.stringify(item)) ? product_set.add(JSON.stringify(item)) : false);

        cart_collection = set.map(function(item) {
           prod_count = products.filter(object => object.product_id === item.product_id).length
           item.prod_count = prod_count
           console.log(prod_count)
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
            <th>Product_ID</th>
            <th>Products_name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
            </tr>
            `
            
            let table = document.getElementById("carts-table");
            table.innerHTML = header

            cart_collection.forEach(product => {
                console.log(product)
                let delete_btn = deleteBtn(product.product_id)
                table.innerHTML += '<tr>' +
                '<td>' + product.product_id + '</td>' +
                '<td>' + product.product_name + '</td>' +
                '<td>' + product.price + '</td>' +
                '<td>' + prod_count + '</td>' +
                '<td>' + product.total + '</td>' +
                // '<td>' + product.seller + '</td>' +
                delete_btn +
                '</tr>'
                console.log(product.product_name)
            });
        }
window.onload = function(event) {
    if (document.getElementById("carts-table")){
        updateCartTable()
    }
}
if (document.getElementById("remove-cart")) {
    document.getElementById("remove-cart").addEventListener("click", removeCart)
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

