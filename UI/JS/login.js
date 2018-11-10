const ul = document.getElementById('login-form'); //Get list to place our users

login.addEventListener('submit', loginfunc);

function loginfunc(e){
    e.preventDefault();

    let email = document.getElementById('login_email').value;
    let password = document.getElementById('login_password').value;

    let reqInit =  {
        'method':'POST',
        'headers':{
            "Content-Type": "application/json",

            'Accept': 'application/json, text/plain, */*'
        },
        body:JSON.stringify({email:email,password:password,})
    };

    let request = new Request('https://eduhmik-store-manager.herokuapp.com/api/v2/auth/login', reqInit);

    fetch(request)
        .then(req => req.json())
        .then(res => {
            if (res.auth_token) {
                localStorage.setItem('auth_token');
                auth_token = localStorage.getItem('auth_token')
                let auth = {
                    'method':'GET',
                    'headers': {
                        "Authorization":'Bearer' + auth_token
                    }
                };
            } else {
                let login_alert = document.getElementById('login_alert');
                login_alert.innerHTML = res.message;
                login_alert.className = 'red-alert';
            }
        })
        .catch(err => console.log(err));
}
