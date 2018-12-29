import ApiClient from './client.js'

const login_alert = document.getElementById('login_alert')

let client = new ApiClient()
let url = window.location.href
let route = url.substr(url.lastIndexOf('/')+1);

if(!client.session() && route !== 'index.html') {
    let message = "You must be logged in first"
    login_alert.innerHTML = message;
    login_alert.style.color = 'red';
    window.location.href = 'index.html'
}

if (document.getElementById('logout')){
    document.getElementById('logout').addEventListener("click", logout)
}

function logout() {
    client.revokeToken()
    localStorage.removeItem('exp')
    let message = 'Logged out successfully'
    setTimeout(() => {
        login_alert.innerHTML = message;
        login_alert.style.color = 'red';
        window.location.href = 'index.html' 
    }, 2000)
}