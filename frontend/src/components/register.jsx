import React, { Component } from 'react'
import './register.css'
import { register } from '../services/userService'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName:"",
            lastName:"",
            email: "",
            password: ""

        }
    }

    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleLoginClick = () => {
        var path = '/'
        this.props.history.push(path)
    }

    handleRegisterSubmit = () => {
        var registerData = {};
        registerData.FirstName=this.state.firstName;
        registerData.LastName=this.state.lastName;
        registerData.EmailId = this.state.email;
        registerData.Password = this.state.password

        console.log("registerData--> ", registerData)

        
        
        register(registerData).then((res) => {
            console.log("respnse in register--> ", res)
           
            if(res.data.success===true){
            alert(`Registration Successful-----`);
            this.handleLoginClick();
            }
            else{
                alert(`Email Already Exists-----`); 
                this.handleLoginClick();
            }            
        }).catch((err) => {
            console.log("error in registration--> ",err)
        })
    }

    render() {
        return (
            <div className="maindiv">
                <div id="register"> Register </div>
                <TextField
                    id="firstName"
                    label="First Name"
                    type="string"
                    name="firstName"
                    margin="normal"
                    value={this.state.firstName}
                    onChange={this.handlechangeall}
                />
                <div>
                    <TextField
                        id="lastName"
                        label="Last Name"
                        type="string"
                        name="lastName"
                        margin="normal"
                        value={this.state.lastName}
                        onChange={this.handlechangeall}
                    />
                </div>
                <div>
                    <TextField
                        id="email"
                        label="Email Id"
                        type="email"
                        name="email"
                        margin="normal"
                        value={this.state.email}
                        onChange={this.handlechangeall}
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        margin="normal"
                        value={this.state.password}
                        onChange={this.handlechangeall}
                    />
                </div>
                
                <div>
                    <Button
                        id="registerButton"
                        variant="contained"
                        color="primary"
                        onClick={this.handleRegisterSubmit}
                    >
                        Register
                    </Button>
                </div>
                <div>

                </div>
                <div>
                    <Button
                        id="loginButton"
                        variant="contained"
                        color="primary"
                        onClick={this.handleLoginClick}
                    >
                        Log in
                    </Button>
                </div>
            </div>
        )
    }
}

export default Register
