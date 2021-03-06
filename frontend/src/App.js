import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


import './App.css';
import Login from './components/login';
import Register from './components/register'
import ForgetPassword from './components/ForgetPassword'
import ResetPassword from './components/ResetPassword'
import ChatApp from './components/chatapp';



export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('LoginToken')
      ? <Component {...props} />
      : <Redirect to='/'/>
  )} />
)


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgetpassword" component={ForgetPassword} />
          <Route path="/resetpassword/:token" component={ResetPassword} />
          {/* <Route path="/chatapp" component={ChatApp} /> */}
          <PrivateRoute path='/chatapp' exact component={ChatApp} />
        </Router>
    
      </div>
    )
  }

}

export default App;
