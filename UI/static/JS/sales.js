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

    let saleItems = []
    let checkout = sales.map(function(product){
        let item = new Object()
        item.product_name = product.product_name
        item.quantity = product.prod_count
        item.total = product.total
        item.seller = localStorage.getItem('seller')
        
        
    saleItems.push(item)
    });

    console.log(saleItems)

    // let sale = new Object()
    // sale.sale_items = checkout

    saleItems.forEach((sale, index) => {
        client.post('sales', sale)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.status == 'ok') {
                setTimeout(() => {
                    login_alert.innerHTML = res.message;
                    login_alert.style.color = 'green';
                    login_alert.focus()
                    //if request is successful
                    localStorage.removeItem("cart_items")
                    window.location.href = "sales.html"
                }, 1000)
            } else {
                login_alert.innerHTML = res.message;
                login_alert.style.color = 'red';
            }
        })
    })
    
}

function cartCheckout(){
    // console.log(localStorage.getItem("checkout"))
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
    var currentDate = new Date();

    var date = currentDate.getDate();
    var daysOfWeek = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = daysOfWeek[currentDate.getDay()];
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = monthNames[currentDate.getMonth()]; //Be careful! January is 0 not 1
    var year = currentDate.getFullYear();

    var dateString = day+ "," + date + "-" +(month) + "-" + year;
    var timestamp = currentDate.getTime();
    var date = new Date("Wed, 27 July 2016 13:30:00");
    table.innerHTML = header
    sales.forEach(sales => {
        table.innerHTML += 
        '<tr>' +
            '<td>' + sales.sales_id + '</td>' +
            '<td>' + sales.product_name + '</td>' +
            '<td>' + sales.quantity + '</td>' +
            '<td>' + sales.total + '</td>' +
            '<td>' + sales.seller + '</td>' +
        '</tr>'+
        '<tr>' + 
        '<td>'  + ' ' + '</td>'+
        '<td>'  + ' ' + '</td>'+
        '<td>'  + ' ' + '</td>'+
        '<td>'  + ' ' + '</td>'+
        '<td>'+'<b>' +  dateString + '</b>'+ '</td>'+
        '</tr>'
        });
      
}