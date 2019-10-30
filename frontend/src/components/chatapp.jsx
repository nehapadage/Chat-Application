import React, { Component } from 'react';
import OverflowScrolling from 'react-overflow-scrolling';
import './chatapp.css'
import { getallusers } from '../services/userService'
import socketIoClient from 'socket.io-client';
import {senMsgApi} from '../services/userService'


// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

class ChatApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Names: [],
            messages: "",
            ReceiverId:"",
            ReceiverName:""
        }
    }



    socketConnection(sendObject) {

        const endpoint = {
            response: false,
            endpoint: "http://localhost:3001"
        }

        const socket = socketIoClient(endpoint)

        socket.emit('connection', sendObject);
    }

    async handleReceiverClick(FirstName, _id) {
        console.log("In handle Receiver click"+JSON.stringify([this.state.Names]));

        console.log("\n\n\tname-->",FirstName)
        console.log("\n\n\tid-->",_id)

        // let sendObject = {
        //     SenderId: localStorage.getItem('SenderId'),
        //     SenderName: localStorage.getItem('SenderName'),
        //     ReceiverId: _id,
        //     ReceiverName: FirstName,
        //     Message: this.state.messages
        // }

      await   this.setState({ReceiverId:_id,
      ReceiverName:FirstName})


        console.log("Receiver data"+this.state.ReceiverId+" "+this.state.ReceiverName);
        


    }

    componentDidMount() {
        getallusers().then((res) => {
            console.log("respnse in chat app get all users--> ", res)
            console.log("only users------>", res.data.data);

            this.setState({
                Names: res.data.data
            })



        }).catch((err) => {
            console.log("error in login--> ", err)
        })



    }

    handlechangeall = (event) => {

        // console.log(event.target);
        
        this.setState({ [event.target.name]: event.target.value })
    }

    sendClick() {

        // console.log("Receiver data************"+this.state.ReceiverId+" "+this.state.ReceiverName);
        let sendObject = {
            SenderId: localStorage.getItem('SenderId'),
            SenderName: localStorage.getItem('SenderName'),
            ReceiverId: this.state.ReceiverId,
            ReceiverName: this.state.ReceiverName,
            Messages: this.state.messages
        }



        console.log("sendObject------->" + JSON.stringify(sendObject));

        this.socketConnection(sendObject)

        senMsgApi(sendObject)

    }



    render() {
        var mapResult = this.state.Names.map(item => {
            return (

                <button id="sideNavButton" onClick={() => this.handleReceiverClick(item.FirstName, item._id)}> {item.FirstName + " " + item.LastName}</button>


            );
        })

        return (
            <OverflowScrolling className='overflow-scrolling'>
                <div className="mainchatdiv">
                    <div id="header">
                        <div id="headText">Chat Application</div>
                        <div>
                            <button class="LogOutButton">Log Out</button>
                        </div>
                    </div>
                    <div className="messageField">
                        <div class="sideNav">

                            {mapResult}


                            
                        </div>
                        <div id="field">
                            <div id="ReceiverName">
                            <div id="ReceiverNameText">{this.state.ReceiverName}.</div>
                            </div>
                            <div id="chatField"></div>
                        <div>
                        <input class="input"

                         onChange={this.handlechangeall}
                         name="messages"
                            value={this.state.messages} 
                            placeholder="type here" ></input>
                             <div className="sendButton">
                                <button onClick={()=>this.sendClick()}>Send</button>
                            </div>
                            </div>
                </div>

                        
                    </div>
                  
                    </div>
                   
            </OverflowScrolling>

        )
    }
}
export default ChatApp;
