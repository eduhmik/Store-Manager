function deleteRecord(product_id) {
    var auth_token = localStorage.getItem("auth_token")
    auth_token = "Bearer" + " " +auth_token
    console.log(auth_token)

    base_url = 'https://eduhmik-store-manager.herokuapp.com/api/v2/'

    if (confirm("Are you sure you want to delete?")) {
        url = base_url + "products/"+product_id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': auth_token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': 'DELETE', 
            },
        }).then(response => response.json())
            .then(res=> {
                if (res.status == 'ok'){
                    setTimeout(() => {
                        login_alert = document.getElementById('login_alert')
                        login_alert.innerHTML = res.message;
                        login_alert.style.color = 'green';
                        login_alert.focus()
                        //if request is successful
                        window.location.href = "inventory.html"
                    }, 1000)
                } else {
                    login_alert.innerHTML = res.message;
                    login_alert.style.color = 'red';
                }
        })
    }
}
