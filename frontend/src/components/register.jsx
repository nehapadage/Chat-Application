import React, { Component } from 'react'
import './register.css'
import { register } from '../services/userService'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Register extends Component {

    constructor(props) {
        super(props);


     this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            firstNameError: "",
            lastNameError: "",
            emailError: "",
            passwordError: "",
            redirect: false

        }
    }
    

    validate = () => {
        let isError=false;
        const errors={

            firstNameError : "",
         lastNameError : "",
         emailError : "",
         passwordError : ""

        };

    
    
        if (this.state.firstName.length < 4) {
            isError=true;
          errors.firstNameError = "First name needs to be atleast 5 characters long";
        }

        if (this.state.lastName.length < 4) {
            isError=true;
            errors.lastNameError = "Last name needs to be atleast 5 characters long";
          }
    
        if (!this.state.email.includes("@")) {
            isError=true;
          errors.emailError = "Requires valid email";
        }

        if ((this.state.password.length < 6 ) || (this.state.password.length > 12) ){
            isError=true;
            
            errors.passwordError = "Password length should greater than 6 and less than 12";
          }
    
          this.setState({
            ...this.state,
            ...errors
          });

          console.log("In validate----->"+this.state);
          
      
          return isError;
      };





      

    setRedirect = () => {
        this.setState({
            redirect: true
        })

    }

    renderRedirect = () => {
        if (this.state.redirect) {
            var path = '/'
            this.props.history.push(path)
        }
    }

    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleLoginClick = () => {
        var path = '/'
        this.props.history.push(path)
    }

    handleRegisterSubmit = (event) => {

        event.preventDefault();
       this.validate()
     const err = this.validate();

    

            var registerData = {};
        registerData.FirstName = this.state.firstName;
        registerData.LastName = this.state.lastName;
        registerData.EmailId = this.state.email;
        registerData.Password = this.state.password

        console.log("registerData--> ", registerData)



        register(registerData).then((res) => {
            console.log("respnse in register--> ", res)

            if (res.data.success === true) {
                alert(`Registration Successful-----`);
                this.setRedirect();
            }
            else {
                alert(`Email Already Exists-----`);
                
            }
        }).catch((err) => {
            console.log("error in registration--> ", err)
        })

        

       if (!err) {
            // clear form
            this.setState({
              firstName: "", 
              firstNameError: "",
              lastName: "",
              lastNameError: "",
              email: "",
              emailError: "",
              password: "",
              passwordError: ""
            });
        }
        
        

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
                    errorText={this.state.firstNameError}
                />
                <div style={{ fontSize: 12, color: "red" }}>
            {this.state.firstNameError}
          </div>
                <div>
                    <TextField
                        id="lastName"
                        label="Last Name"
                        type="string"
                        name="lastName"
                        margin="normal"
                        value={this.state.lastName}
                        onChange={this.handlechangeall}
                        errorText={this.state.lastNameError}
                    />
                </div>
                <div style={{ fontSize: 12, color: "red" }}>
            {this.state.lastNameError}
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
                       // error={this.state.passwordError}
                        margin="normal"
                        value={this.state.password}
                        onChange={this.handlechangeall}
                        errorText={this.state.passwordError}
                    />
                </div>
                <div style={{ fontSize: 12, color: "red" }}>
            {this.state.passwordError}
          </div>
          <div>
                <div>
                    {this.renderRedirect()}
                    <Button
                        id="registerButton"
                        variant="contained"
                        color="primary"
                        onClick={this.handleRegisterSubmit}
                    >
                        Register
                    </Button>
                </div>
               <br>
               </br>
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
            </div>
        )
    }
}

export default Register
