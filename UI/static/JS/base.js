import ApiClient from './client.js'

const login_alert = document.getElementById('login_alert');

let client = new ApiClient()
let url = window.location.href;
var route = url.substr(url.lastIndexOf('/') + 1);


if (!client.session() && route !=="login.html") {
    let message = "You must be logged in first!"
    login_alert.innerHTML = res.message;
    login_alert.style.color = 'red';
}

function backHome() {
    window.location.replace("index.html")
}

