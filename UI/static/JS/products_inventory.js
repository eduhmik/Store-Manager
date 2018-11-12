import ApiClient from './client.js'


const add_product = document.getElementById('product-form');
const edit_product = document.getElementById('edit-product-form');
const login_alert = document.getElementById('login_alert');

let client = new ApiClient()
var products_inventory = new Array()

function getProducts() {
    client.get('products')
    .then(req => req.json())
    .then(res=>{
        if (res.status == 'ok') {
            products_inventory = res.product
            updateTable(products_inventory)
        } else if (res.status == 'fail'){
            
            login_alert.innerHTML = resp.message;
            login_alert.style.color = 'red';

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

function tableHeader() {
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
    return header
}

function editBtn(product) {
    var product = JSON.stringify(product)
    var list_string = "" + product + ""
    console.log(product)
    var edit_btn =` 
            <td>
                <button id="edit-product-btn" onclick='openEditForm(${list_string})'>
                <img src="static/images/edit.png" height="30px" width="30px"></button>
            </td>
            `
    return edit_btn;
}

function deleteBtn(product_id) {
    var product_id = product_id
    var delete_btn = `
            <td>
                <button id='delete-product-btn' onclick='deleteRecord(${product_id})'>
                <img src="static/images/delete.png" height="30px" width="30px"></button>
            </td>
            `
    return delete_btn;
}

function updateTable(products_inventory) {
    let header = tableHeader()
    let table = document.getElementById('products-table');
    table.innerHTML = header

    products_inventory.forEach(product=> {
        let edit_btn = editBtn(product)
        let delete_btn = deleteBtn(product.product_id)
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

function getProductById(product_id) {
    let product = products_inventory.find(product => product.product_id === product_id)
    return product
}

window.onload = getProducts()

edit_product.addEventListener('submit', editProductFunc);

function editProductFunc(e) {
    e.preventDefault()

    let edit_form = document.getElementById('edit-product-form')
    let product_id = edit_form.elements.namedItem('product_id').value
    let product_name = edit_form.elements.namedItem('product_name').value
    let category = edit_form.elements.namedItem('category').value
    let quantity = edit_form.elements.namedItem('quantity').value
    let reorder_level = edit_form.elements.namedItem('reorder_level').value 
    let price = edit_form.elements.namedItem('price').value

    let data = {
        "product_name": product_name,
        "category": category,
        "quantity": quantity,
        "reorder_level": reorder_level,
        "price": price
    }
    
    
    let url = 'products/'+product_id
    
    client.put(url, data)
    .then(result => result.json())
        .then(rest => {
            if (rest.status  === 201) {
                setTimeout(() => {
                    login_alert.innerHTML = rest.message;
                    login_alert.style.color = 'green';
                    login_alert.focus()
                    //if request is successful
                    window.location.href = "inventory.html"
                }, 1000)
            } else {
                login_alert.innerHTML = rest.message;
                login_alert.style.color = 'red';
            }
        })
    .catch(err => console.log(err))
}


