let socket = require('socket.io-client')('http://localhost:3001');


const axios = require('axios');

var url = "http://localhost:3000"

var myToken = localStorage.getItem('ForgetToken');



//this flow goes to router in backend
export function login(loginData) {
    console.log("log in data in services--> ", loginData)
    var login = axios.post(url + '/login', loginData)

    return login
}

export function register(registerData) {
    console.log("register data in services--> ", registerData)
    var register = axios.post(url + '/register', registerData)

    return register;
}

export function forgetpassword(forgetData) {
    console.log("forget password data in services--> ", forgetData)
    var forget = axios.post(url + '/forgetpassword', forgetData)

    return forget;
}

export function resetpassword(resetData) {
    console.log("reset password data in services--> ", resetData)
    console.log("token ----->", myToken);

    var reset = axios.post(url + '/resetpassword/', resetData, {
        headers: {
            token: myToken
        }
    });

    return reset;
}

export function getallusers() {
    var users = axios.post(url + '/getallusers')

    return users;
}

export function senMsgApi(msgObj){
    axios.post(url+"/sendmessage",msgObj)

socket.emit("chat message",msgObj)


}