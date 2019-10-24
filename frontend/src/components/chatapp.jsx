import React, { Component } from 'react';
import OverflowScrolling from 'react-overflow-scrolling';
import './chatapp.css'
import { getallusers } from '../services/userService'
import socketIoClient from 'socket.io-client';


// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

class ChatApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Names: []
        }
    }

    sendObject={
        
    }


     socketConnection(sendObject){

        const endpoint ={
        response: false,
        endpoint: "http://localhost:3001"
        }
        
        const socket = socketIoClient(endpoint)
        
        socket.emit('connection', sendObject );
        }

handleReceiverClick(){
    console.log("In handle Receiver click"+[this.state.Names]);
    
}

    componentDidMount() {
        getallusers().then((res) => {
            console.log("respnse in chat app get all users--> ", res)
            console.log("only users------>", res.data.data);

            this.setState({
                Names: res.data.data
            })

            this.socketConnection(res)




            console.log("****" + [this.state.Names]);


        }).catch((err) => {
            console.log("error in login--> ", err)
        })



    }



    render() {
        var mapResult = this.state.Names.map(item => {
            return (

                <button id="sideNavButton" onClick={this.handleReceiverClick}> {item.FirstName + " " + item.LastName}</button>



            );
        })

        console.log("Map result------>" + mapResult);
        return (
            <OverflowScrolling className='overflow-scrolling'>
                <div className="mainchatdiv">
                    <div id="header">
                        <div id="headText">Chat Application</div>
                        <div>
                            <button class="LogOutButton">Log Out</button></div></div>

                    <div class="sideNav">

                        {mapResult}

                        <div>
                            <input class="input" placeholder="type here"></input>
                        </div>
                        <div className="buttonStyle">
                        <button>Send</button>
                        </div>

                    </div>

                </div>
            </OverflowScrolling>

        )
    }
}
export default ChatApp;
