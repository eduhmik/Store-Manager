import ApiClient from './client.js'

const login_alert = document.getElementById('login_alert');

let client = new ApiClient()
window.onload = function(sales) {
    sales.preventDefault();

    client.get('sales')
    .then(req => req.json())
    .then(res=>{
        if (res.status == 'ok') {
            let sales = res.sales

            let header = `
            <tr>
            <th>Sales_ID</th>
            <th>Products_name</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Seller</th>
            </tr>
            `
            
            let table = document.getElementById("sales-table");
            table.innerHTML = header

            sales.forEach(sales => {
                table.innerHTML += '<tr>' +
                '<td>' + sales.sales_id + '</td>' +
                '<td>' + sales.product_name + '</td>' +
                '<td>' + sales.quantity + '</td>' +
                '<td>' + sales.total + '</td>' +
                '<td>' + sales.seller + '</td>' +
                '</tr>'
            });
        } else {
            login_alert.innerHTML = res.message;
            login_alert.style.color = 'red';
        }
    })
    .catch (err => console.log(err));
}