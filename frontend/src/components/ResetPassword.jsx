import React, { Component } from 'react';
import { resetpassword } from '../services/userService'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: ""
        }
    }

    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmitButton=()=>{
        var resetData = {};
        resetData.Password = this.state.password;
    
        console.log("reset data--> ", resetData)

        
        
        resetpassword(resetData).then((res) => {
            console.log("respnse in reset password--> ", res)
           
          
            
            
        }).catch((err) => {
            console.log("error in reset--> ",err)
        })
    }

    render() {
        return (
            <div className="maindiv">
                <form onSubmit={this.handlesubmit} ></form>
                <div id="login"> Reset Password </div>
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
                        id="signinButton"
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmitButton}
                    >
                        Submit
                    </Button>
                </div>
                
            </div>
        );
    }
}

export default ResetPassword;