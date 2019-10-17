import React, { Component } from 'react'
import './login.css'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
            email: "",
            password: ""

        }
    }

    handlechangeall = (event) =>{
        this.setState ( { [event.target.name] :event.target.value  } )
       }
       
       handlesubmit = (event) => {
        alert (`My email id is ${this.state.email}`);
        // alert( JSON.stringify(this.state));
        console.log( JSON.stringify(this.state));
        // event.preventDefault();
       }

    render() {
        return (

            <div className="maindiv">
                <form onSubmit = {this.handlesubmit} ></form>
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
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div>

                    <Button
                        id="forgetPassword"
                        variant="contained"

                    >
                        Forget Password?
                    </Button>

                </div>
                <div>
                    <Button
                        id="signinButton"
                        variant="contained"
                        color="primary"
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
                    >
                        Register
                    </Button>
                </div>
            </div>
        )
    }
}

export default Login
