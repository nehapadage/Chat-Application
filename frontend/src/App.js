import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import Login from './components/login';
// import Register from './components/register';


class App extends Component
 {
   render()
   {
    return (
      <div>
        {/* <Register/> */}
        <Login/>

      </div>
    )
   }
  
}

export default App;
