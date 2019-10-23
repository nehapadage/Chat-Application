import React, { Component } from 'react';
import OverflowScrolling from 'react-overflow-scrolling';
import './chatapp.css'
import { getallusers } from '../services/userService'
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

class ChatApp extends Component {

    constructor(props) {
        super(props);
        this.state = {


        }
    }

    

componentDidMount(){
        getallusers().then((res) => {
            console.log("respnse in chat app get all users--> ", res)
            console.log("only users------>",res.data.data);
            
            // const users = res.data.data.map(item => {
            //     const container = {};
            
            //     container[item.firstName]= item.lastName;
                
            
            //     return container;
            // })          
            // console.log(users);

            
        }).catch((err) => {
            console.log("error in login--> ",err)
        })
    
    }
    


    render() {
        return (
            <OverflowScrolling className='overflow-scrolling'>
                <div className="mainchatdiv">
                    <div id="header">
                        <div id="headText">Chat Application</div>
                <div>
                    <button class="LogOutButton">Log Out</button></div></div>

                    <div class="sideNav">

                        <div>
                            <input class="input" placeholder="type here"></input>

                        </div>
                        <div>
                            <button class="sendButton">send</button>
                        </div>
                    </div>
                </div>
            </OverflowScrolling>

        )
    }
}
export default ChatApp;
