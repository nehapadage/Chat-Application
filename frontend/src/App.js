import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";


import './App.css';
import Login from './components/login';
import Register from './components/register'
import ForgetPassword from './components/ForgetPassword'
import ResetPassword from './components/ResetPassword'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgetpassword" component={ForgetPassword} />
          <Route path="/resetpassword" component={ResetPassword} />
        </Router>
      </div>
    )
  }

}

export default App;