const login = document.getElementById('login-form'); //Get list to place our users

login.addEventListener('submit', loginfunc);

function loginfunc(e){
    e.preventDefault();

    let email = document.getElementById('login_email').value;
    let password = document.getElementById('login_password').value;

    let reqInit =  {
        'method':'POST',
        'mode':'cors',
        'headers':{
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
            'Access-Control-Allow-Origin': '*'
        },
        body:JSON.stringify({email:email,password:password,})
    };

    let request = new Request('http://127.0.0.1:5000/api/v2/auth/login', reqInit);

    fetch(request)
        .then(req => req.json())
        .then(res => {
            if (res.auth_token) {
                localStorage.setItem('auth_token', res.auth_token);
                auth_token = localStorage.getItem('auth_token')
                
                //if request is successful
                window.location.href = "index.html"
            } else {
                let login_alert = document.getElementById('login_alert');
                login_alert.innerHTML = res.message;
                login_alert.style.color = 'red';
            }
        })
        .catch(err => console.log(err));
}
