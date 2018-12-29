import ApiClient from './client.js'

const login = document.getElementById('login-form'); //Get list to place our users
const login_alert = document.getElementById('login_alert');

login.addEventListener('submit', loginfunc);
let client = new ApiClient()


if (client.session()) {
    window.location = 'products.html'
}

function loginfunc(e){
    e.preventDefault();

    var email = document.getElementById('login_email').value;
    var password = document.getElementById('login_password').value;
    

    var data = {"email": email, "password": password}

    client.post('auth/login', data)
        .then(req => req.json())
        .then(res => {
            if (res.auth_token) {
                client.setToken(res.auth_token)
                let seller = data.email
                console.log(seller)
                client.setSeller(data.email)
                setTimeout(() => {
                    login_alert.innerHTML = res.message;
                    login_alert.style.color = 'green';
                    login_alert.focus()
                    //set expiry time
                    var exp = new Date('1970-01-01T' + res.exp + 'Z');
                    var time = new Date()

                    //add exp to current time
                    time = new Date(time.setMinutes(time.getMinutes() + exp.getMinutes()))
                    client.setExpiryTime(time)
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
