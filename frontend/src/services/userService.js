const axios = require('axios');

var url = "http://localhost:4005"

//this flow goes to router in backend
export function login(loginData) {
    console.log("log in data in services--> ", loginData)
    var login = axios.post(url + '/login', loginData)

    return login
}

export function register(registerData){
    console.log("register data in services--> ", registerData)
    var register = axios.post(url + '/register', registerData)

    return register;
}

export function forgetpassword(forgetData){
    console.log("forget password data in services--> ", forgetData)
    var forget = axios.post(url + '/forgetpassword', forgetData)

    return forget;
}