import ApiClient from './client.js'


const add_product = document.getElementById('product-form');
const login_alert = document.getElementById('login_alert');

let client = new ApiClient()
window.onload = function(productsInv) {
    productsInv.preventDefault();

    client.get('products')
    .then(req => req.json())
    .then(res=>{
        if (res.status == 'ok') {
            let products_inventory = res.product

            let header = `
            <tr>
                <th>Products_ID</th>
                <th>Products_name</th>
                <th>Category</th>
                <th>Stock_Quantity</th>
                <th>Reorder_level</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            `
            let edit_btn =` 
                    <td>
                        <a href="#"><img src="static/images/edit.png" height="30px" width="30px"></a>
                    </td>
                    `
                

            let delete_btn = `
                    <td>
                        <a href="#"><img src="static/images/delete.png" height="30px" width="30px"></a>
                    </td>
                    `

            let table = document.getElementById("products-table");
            table.innerHTML = header

            products_inventory.forEach(product => {
                table.innerHTML += '<tr>' +
                '<td>' + product.product_id + '</td>' +
                '<td>' + product.product_name + '</td>' +
                '<td>' + product.category + '</td>' +
                '<td>' + product.quantity + '</td>' +
                '<td>' + product.reorder_level + '</td>' +
                '<td>' + product.price + '</td>' +
                edit_btn + delete_btn + 
                '</tr>'
            });
        }
    })
    .catch (err => console.log(err));
}

add_product.addEventListener('submit', addProductFunc);

function addProductFunc(e) {
    e.preventDefault();

    let product_name = document.getElementById('add_name').value;
    let category = document.getElementById('add_category').value;
    let quantity = document.getElementById('add_quantity').value;
    let reorder_level = document.getElementById('add_reorderlevel').value;
    let price = document.getElementById('add_price').value;

    let data = {
        "product_name": product_name,
        "category": category,
        "quantity": quantity,
        "reorder_level": reorder_level,
        "price": price
    }

    client.post('products', data)
    .then(response => response.json())
        .then(resp => {
            if (resp.message == 'product created successfully') {

                setTimeout(() => {
                    login_alert.innerHTML = resp.message;
                    login_alert.style.color = 'green';
                    login_alert.focus()
                    //if request is successful
                    window.location.href = "inventory.html"
                }, 1000)
            } else {
                login_alert.innerHTML = resp.message;
                login_alert.style.color = 'red';
            }
        })
        .catch(err => console.log(err));
}