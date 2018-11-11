import ApiClient from './client.js'

const login = document.getElementById('login-form'); //Get list to place our users
const login_alert = document.getElementById('login_alert');

login.addEventListener('submit', loginfunc);
let client = new ApiClient()

function loginfunc(e){
    e.preventDefault();

    let email = document.getElementById('login_email').value;
    let password = document.getElementById('login_password').value;
    

    let data = {"email": email, "password": password}

    client.post('auth/login', data)
        .then(req => req.json())
        .then(res => {
            if (res.auth_token) {
                client.setToken(res.auth_token)
                
                setTimeout(() => {
                    login_alert.innerHTML = res.message;
                    login_alert.style.color = 'green';
                    login_alert.focus()
                    //if request is successful
                    window.location.href = "products.html"
                }, 1000)
            } else {
                login_alert.innerHTML = res.message;
                login_alert.style.color = 'red';
            }
        })
        .catch(err => console.log(err));
}
