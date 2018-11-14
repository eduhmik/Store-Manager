import ApiClient from './client.js'

const login_alert = document.getElementById('login_alert');

let client = new ApiClient()
window.onload = function(event) {
    event.preventDefault();

    client.get('products')
    .then(req => req.json())
    .then(res=>{
        if (res.status == 'ok') {
            let products = res.product

            let header = `
            <tr>
            <th>Products_ID</th>
            <th>Products_name</th>
            <th>Category</th>
            <th>Stock_Quantity</th>
            <th>Reorder_level</th>
            <th>Price</th>
            <th>Add to Cart</th>
            </tr>
            `

            let table = document.getElementById("products-cart-table");
            table.innerHTML = header

            products.forEach(product => {
            var cart = JSON.stringify(product)
            //console.log(product)
            var list_string = " " + cart + " "
            console.log(list_string)
            let add_btn =` 
                    <td>
                    <div class="header_buttons">
                    <Button class="btn bg-slate login_button" onclick='addToCart(${list_string})'>Add To Cart
                    <img src="static/images/cart.png" alt="cart" class="cart"></Button>
                    </td>
                    `

                    table.innerHTML += '<tr>' +
                    '<td>' + product.product_id + '</td>' +
                    '<td>' + product.product_name + '</td>' +
                    '<td>' + product.category + '</td>' +
                    '<td>' + product.quantity + '</td>' +
                    '<td>' + product.reorder_level + '</td>' +
                    '<td>' + product.price + '</td>' +
                    add_btn + 
                    '</tr>'
            });
        } else {
            login_alert.innerHTML = resp.message;
            login_alert.style.color = 'red';
        }
    })
    .catch (err => console.log(err));
}
