import ApiClient from './client.js'

const login_alert = document.getElementById('login_alert');

let client = new ApiClient()

function deleteBtn(sales_id) {
    var sales_id = sales_id
    var delete_btn = `
            <td>
                <button id='delete-product-btn' onclick='deleteRecord(${sales_id})'>
                <img src="static/images/delete.png" height="30px" width="30px"></button>
            </td>
            `
    return delete_btn;
}

window.onload = function(carts) {
    carts.preventDefault();

    client.get('carts/mutethiageoffrey@gmail.com')
    .then(req => req.json())
    .then(res=>{
        if (res.status == 'ok') {
            let carts = res.cart
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

            carts.forEach(cart => {
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
        } else {
            login_alert.innerHTML = res.message;
            login_alert.style.color = 'red';
        }
    })
    .catch (err => console.log(err));
}
