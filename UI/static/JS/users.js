import ApiClient from './client.js'


const add_user = document.getElementById('user-form');
const login_alert = document.getElementById('login_alert');

let client = new ApiClient()
window.onload = function(users) {
    users.preventDefault();

    client.get('users')
    .then(req => req.json())
    .then(res=>{
        if (res.status == 'ok') {
            let users = res.users

            let header = `
            <tr>
                <th>Users_ID</th>
                <th>Usersname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            `
            let edit_btn =` 
                    <td>
                        <a href="#"><img src="static/images/edit.png" height="30px" width="30px"></a>
                    </td>
                    `
                

            let delete_btn = `
                    <td>
                        <a href="#"><img src="static/images/delete.png" height="30px" width="30px"></a>
                    </td>
                    `

            let table = document.getElementById("users-table");
            table.innerHTML = header

            users.forEach(user => {
                table.innerHTML += '<tr>' +
                '<td>' + user.id + '</td>' +
                '<td>' + user.username + '</td>' +
                '<td>' + user.email + '</td>' +
                '<td>' + user.phone + '</td>' +
                '<td>' + user.role + '</td>' +
                edit_btn + delete_btn + 
                '</tr>'
            });
        }
    })
    .catch (err => console.log(err));
}

add_user.addEventListener('submit', addUserFunc);

function addUserFunc(e) {
    e.preventDefault();

    let username = document.getElementById('add_username').value;
    let email = document.getElementById('add_email').value;
    let phone = document.getElementById('add_phone').value;
    let role = document.getElementById('add_role').value;
    let password = document.getElementById('add_password').value;

    let data = {
        "username": username,
        "email": email,
        "phone": phone,
        "role": role,
        "password": password
    }

    client.post('auth/signup', data)
    .then(response => response.json())
        .then(resp => {
            if (resp.message == 'User created successfully') {

                setTimeout(() => {
                    login_alert.innerHTML = resp.message;
                    login_alert.style.color = 'green';
                    login_alert.focus()
                    //if request is successful
                    window.location.href = "employees.html"
                }, 1000)
            } else {
                login_alert.innerHTML = resp.message;
                login_alert.style.color = 'red';
            }
        })
        .catch(err => console.log(err));
}