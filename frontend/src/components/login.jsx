import React, { Component } from 'react'
import './login.css'
import { login } from '../services/userService'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {

            email: "",
            password: "",
            emailError: "",
            passwordError: ""

        }
    }

    validate = () => {
        let isError = false;

        const errors = {
            emailError: "",
            passwordError: ""
        };

        if (!this.state.email.includes("@")) {
            isError = true;
            errors.emailError = "Requires valid email";
        }

        if ((this.state.password.length < 6) || (this.state.password.length > 12)) {
            isError = true;

            errors.passwordError = "Password length should greater than 6 and less than 12";
        }

        this.setState({
            ...this.state,
            ...errors
        });

        console.log("In validate----->" + this.state);


        return isError;
    };


    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    handleRegisterClick = () => {
        console.log("register button clicked..")
        var path = '/register'
        this.props.history.push(path)
    }

    handleloginSubmit = (event) => {

        event.preventDefault();
        this.validate()
        const err = this.validate();

        var loginData = {};
        loginData.EmailId = this.state.email;
        loginData.Password = this.state.password

        console.log("logindata--> ", loginData)



        login(loginData).then((res) => {
            console.log("respnse in login--> ", res)

            console.log("****respnse in login token is--> ", res.data.token.token)
            console.log("data of login user--->" + res.data.data.FirstName);


            if (res.data.success === true) {
                alert("Login Successful-----");
                var path = '/chatapp'
                this.props.history.push(path)
            }
            else
            {
                alert("EmailId or Password is incorrect");
            }
            localStorage.setItem('LoginToken', res.data.token.token);
            localStorage.setItem('SenderName', res.data.data.FirstName);
            localStorage.setItem('SenderId', res.data.data._id);



            // this.clearField();


        }).catch((err) => {
            console.log("error in login--> ", err)
        })

        if (!err) {
            // clear form
            this.setState({
                email: "",
                emailError: "",
                password: "",
                passwordError: ""
            });
        }
    }

    handleforgetPasswordSubmit = () => {
        console.log("forget password button clicked..")
        var path = '/forgetpassword'
        this.props.history.push(path)
    }



    render() {
        return (

            <div className="maindiv">
                {/* <form onSubmit={this.handlesubmit} ></form> */}
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
                        errorText={this.state.emailError}

                    />

                </div>
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.emailError}
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
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.passwordError}
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
