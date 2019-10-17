import React, { Component } from 'react'
import './register.css'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Register extends Component {
    render() {
        return (
            <div className="maindiv">
                <div id="register"> Register </div>
                <TextField
                    id="firstName"
                    label="First Name"
                    type="string"
                    margin="normal"
                />
                <div>
                    <TextField
                        id="lastName"
                        label="Last Name"
                        type="string"
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        id="email"
                        label="Email Id"
                        type="email"
                        name="email"
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        margin="normal"
                    />
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

export default Register
