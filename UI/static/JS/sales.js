import ApiClient from './client.js'

const login_alert = document.getElementById('login_alert');

let client = new ApiClient()

if (document.getElementById("checkout")) {
    document.getElementById("checkout").addEventListener("click", addSale)
}

function addSale(e){
    e.preventDefault()
    let sales = []
    if (cartCheckout() !== null) {
        sales = JSON.parse(cartCheckout())
    }

    let checkout = sales.map(function(product){
        let item = new Object()
        item.product_name = product.product_name
        item.item_count = product.prod_count
        item.price = product.total
        item.seller = client.getSeller()
        
        return item
    });

    let sale = new Object()
    sale.sale_items = checkout

    client.post('sales', sale)
        .then(req => req.json())
        .then(res => {
            if (res.status == 'ok') {
                setTimeout(() => {
                    login_alert.innerHTML = resp.message;
                    login_alert.style.color = 'green';
                    login_alert.focus()
                    //if request is successful
                    localStorage.removeItem("cart_items")
                    window.location.href = "sales.html"
                }, 1000)
            } else {
                login_alert.innerHTML = resp.message;
                login_alert.style.color = 'red';
            }
        })
}

function cartCheckout(){
    console.log(localStorage.getItem("checkout"))
    return localStorage.getItem("checkout")
}

if (document.getElementById("sales-table")) {
    window.onload = getSales();
}

function getSales() {
    client.get('sales')
    .then(req => req.json())
    .then(resp=>{
        if (resp.status == 'ok') {
            let sales = resp.sales
            updateSalesTable(sales)
            } else {
            login_alert.innerHTML = res.message;
            login_alert.style.color = 'red';
        }
    })
    .catch (err => console.log(err));
}

function Header(){
    let header = `
            <tr>
            <th>Sales_ID</th>
            <th>Products_name</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Seller</th>
            </tr>
            `
    return header
}

function updateSalesTable(sales) {
    let table = document.getElementById("sales-table");
    let header = Header();
    table.innerHTML = header
    sales.forEach(sales => {
        sales.sale_items.forEach(sale_item => {

        table.innerHTML += '<tr>' +
            '<td>' + sales.sales_id + '</td>' +
            '<td>' + sale_item.product_name + '</td>' +
            '<td>' + sale_item.quantity + '</td>' +
            '<td>' + sale_item.total + '</td>' +
            '<td>' + sale_item.seller + '</td>' +
            '</tr>'
        });
    })     
      
}