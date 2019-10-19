import React, { Component } from 'react'
import './login.css'
import { login } from '../services/userService'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import { pathToFileURL } from 'url';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {

            email: "",
            password: ""

        }
    }

    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    
    handleRegisterClick = () => {
        console.log("register button clicked..")
        var path = '/register'
        this.props.history.push(path)
    }

    handleloginSubmit = () => {
        var loginData = {};
        loginData.EmailId = this.state.email;
        loginData.Password = this.state.password

        console.log("logindata--> ", loginData)

        
        
        login(loginData).then((res) => {
            console.log("respnse in login--> ", res)

            console.log("****respnse in login token is--> ", res.data.data.token.token)

                     
            if(res.data.success===true)
            alert("Login Successful-----");

            localStorage.setItem('token',res.data.data.token.token );
            
            
        }).catch((err) => {
            console.log("error in login--> ",err)
        })
    }

    handleforgetPasswordSubmit=()=>{
        console.log("forget password button clicked..")
        var path = '/forgetpassword'
        this.props.history.push(path)
    }

    render() {
        return (

            <div className="maindiv">
                <form onSubmit={this.handlesubmit} ></form>
                <div id="login"> Login </div>
                <div>
                    <TextField
                        id="email"
                        label="Email Id"
                        type="email"
                        name="email"
                        value={this.state.email}
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handlechangeall}
                    />

                </div>
                <div>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handlechangeall}
                    />
                </div>
                <div>

                    <Button
                        id="forgetPassword"
                        variant="contained"
                        onClick={this.handleforgetPasswordSubmit}
                    >
                        Forget Password?
                    </Button>

                </div>
                <div>
                    <Button
                        id="signinButton"
                        variant="contained"
                        color="primary"
                        onClick={this.handleloginSubmit}
                    >
                        Log In
                    </Button>
                </div>
                <div id="registerText">
                    <h2>
                        Not Registered Yet? Register Now!
                    </h2>

                </div>

                <div>
                    <Button
                        id="registerButton"
                        variant="contained"
                        color="primary"
                        onClick={this.handleRegisterClick}
                    >
                        Register
                    </Button>
                </div>
            </div>
        )
    }
}

export default Login
