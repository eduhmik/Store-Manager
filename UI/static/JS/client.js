let base_url = 'https://eduhmik-store-manager.herokuapp.com/api/v2/'

export default class ApiClient {
    constructor() {

    }

    setToken(token){
        localStorage.setItem('auth_token', token)
    }

    getToken(){
        return localStorage.getItem('auth_token')
    }
    
    revokeToken() {
        return localStorage.removeItem('auth_token')
    }

    setSeller(seller){
        localStorage.setItem('seller', seller)
    }

    getSeller(){
        localStorage.getItem('seller')
    }

    post(url, data) {
        url = base_url + url
        let token = this.getToken()
        let auth_token = `Bearer ${token}`

        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': auth_token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': 'POST',
            },
            body: JSON.stringify(data)
        });
    }

    put(url, data) {
        url = base_url + url
        let token = this.getToken()
        let auth_token = `Bearer ${token}`

        return fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': auth_token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': 'PUT',
            },
            body: JSON.stringify(data)
        });
    }

    get(url, data) {
        url = base_url + url
        let token = this.getToken()
        let auth_token = `Bearer ${token}`

        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': auth_token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': 'GET',
            },
            body: JSON.stringify(data)
        });
    }

    delete(url, data) {
        url = base_url + url
        let token = this.getToken()
        let auth_token = `Bearer ${token}`

        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': auth_token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': 'DELETE',
            },
            body: JSON.stringify(data)
        });
    }

    session(){
        if (this.getToken()){
            return true
        } else {
            return false
        }
    }
}