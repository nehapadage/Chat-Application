import React, { Component } from 'react';
import './chatapp.css'
import { getallusers } from '../services/userService'
import { getAllMessages } from '../services/userService'
import Message from '../components/Message'
import apiFunc from './ApiFunc'

// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

class ChatApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Names: [],
            messages: "",
            ReceiverId: "",
            ReceiverName: "",
            Messages: [],
            ReceivedMessages: [],
            redirect: false
        }
    }

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



    async handleReceiverClick(FirstName, _id) {
        // console.log("In handle Receiver click" + JSON.stringify([this.state.Names]));

        // console.log("\n\n\tname-->", FirstName)
        // console.log("\n\n\tid-->", _id)

        // let sendObject = {
        //     SenderId: localStorage.getItem('SenderId'),
        //     SenderName: localStorage.getItem('SenderName'),
        //     ReceiverId: _id,
        //     ReceiverName: FirstName,
        //     Message: this.state.messages
        // }

        await this.setState({
            ReceiverId: _id,
            ReceiverName: FirstName
        })


        console.log("Receiver data" + this.state.ReceiverId + " " + this.state.ReceiverName);



    }

    componentDidMount() {



        // this.socketConnection()
        apiFunc.socketCon()

        this.getUsers()
        // getallusers().then((res) => {
        //     console.log("respnse in chat app get all users--> ", res)
        //     console.log("only users------>", res.data.data);

        //     this.setState({
        //         Names: res.data.data
        //     })



        // }).catch((err) => {
        //     console.log("error in login--> ", err)
        // })

        this.getMessages()
        // getAllMessages().then((res) => {
        //     console.log("respnse in chat app get all messages--> ", res)
        //     console.log("User data with messages------>", res.data.data);

        //     this.setState({
        //         Messages: res.data.data
        //     })



        // }).catch((err) => {
        //     console.log("error in login--> ", err)
        // })

        //================================================================
        apiFunc.receivedMsg((error, result) => {

            if (result) {

                console.log("result is back...", result);

                // console.log("in result receiverID", result.ReceiverId);
                // console.log("in result local storage ID", localStorage.getItem('SenderId'));

                // console.log((localStorage.getItem('SenderId') === result.ReceiverId));

                // if ((localStorage.getItem('SenderId') == result.ReceiverId)) {

                //     let array = []

                //     array = this.state.Messages

                //     console.log("Array is ", JSON.stringify(array));


                //     array.push(result.Messages)

                //     this.setState({
                //         Messages: array
                //     })

                // }
                // // if(){

                // }

                var resultArray = [];
                // resultArray.push(result);
                resultArray = this.state.Messages;

                resultArray.push(result)

                this.setState({
                    Messages: resultArray
                })

                // this.exchange();




                // this.setState({ReceivedMessages:result});

                // this.state.ReceivedMessages.push(result);

                console.log("Received Messages are---->", JSON.stringify(this.state.Messages));


            }
            else {
                console.log("Error in received message--->", error);

            }
        })



    }

    getUsers = () => {
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

    getMessages = () => {
        getAllMessages().then((res) => {
            console.log("respnse in chat app get all messages--> ", res)
            console.log("User data with messages------>", res.data.data);

            this.setState({
                Messages: res.data.data
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

        apiFunc.Emitfun(sendObject);

        // apiFunc.receivedMsg((error, result) => {

        //     if (result) {

        //         console.log("result is back...", result);

        //         console.log("in result receiverID",result.ReceiverId);
        //         console.log("in result local storage ID",localStorage.getItem('SenderId'));

        //         console.log((localStorage.getItem('SenderId') === result.ReceiverId));

        //         if((localStorage.getItem('SenderId') == result.ReceiverId))
        //         {
        //             let array = []

        //             array = this.state.Messages

        //             array.push(result.Messages)

        //             this.setState({
        //                 Messages: array
        //             })

        //         }
        //         // if(){

        //         // }

        //         var resultArray = [];
        //         // resultArray.push(result);
        //         resultArray = this.state.Messages;

        //         resultArray.push(result)

        //         this.setState({
        //             Messages: resultArray
        //         })

        //         // this.exchange();




        //         // this.setState({ReceivedMessages:result});

        //         // this.state.ReceivedMessages.push(result);

        //         console.log("Received Messages are---->", JSON.stringify(this.state.Messages));


        //     }
        //     else {
        //         console.log("Error in received message--->", error);

        //     }
        // })


        this.getMessages()
        // senMsgApi(sendObject)



    }

    logOutClick(){
        localStorage.clear();
        this.setRedirect();
    }


    // exchange = async() => {

    //     await this.setState({ReceiverId:localStorage.getItem('SenderId')},
    //             {ReceiverName:localStorage.getItem('SenderName')})
    // }


    render() {


        var mapUserResult = this.state.Names.map(item => {
            return (

                <button id="sideNavButton" onClick={() => this.handleReceiverClick(item.FirstName, item._id)}> {item.FirstName + " " + item.LastName}</button>
            );
        })

        var mapMessageResult = this.state.Messages.map(item => {
            if ((((item.SenderId === localStorage.getItem('SenderId')) && item.ReceiverId === this.state.ReceiverId)) || ((item.SenderId === this.state.ReceiverId && item.ReceiverId === localStorage.getItem('SenderId')))) {
                console.log("item in if " + item.Messages);

                return (

                    <Message senderIdItem={item.SenderId} MessagesItem={item.Messages} />


                );
            }
        })

        console.log("map result" + mapMessageResult);



        return (

            <div className="mainchatdiv">
                <div id="header">
                    <div id="sendername">{localStorage.getItem('SenderName')}</div>
                    <div id="headText">Chat Application</div>
                    <div>
                    {this.renderRedirect()}
                        <button class="LogOutButton" onClick={() => this.logOutClick()}>Log Out</button>
                    </div>
                </div>
                <div className="messageField">
                    <div class="sideNav">

                        {mapUserResult}



                    </div>
                    <div id="field">
                        <div id="ReceiverName">
                            <div id="ReceiverNameText">{this.state.ReceiverName}.</div>
                        </div>
                        <div id="chatField">
                            {mapMessageResult}
                        </div>


                        <div id='inputField'>
                            <input class="input"

                                onChange={this.handlechangeall}
                                name="messages"
                                value={this.state.messages}
                                placeholder="type here" ></input>
                            <div className="sendButton">
                                <button id="send" onClick={() => this.sendClick()}>Send</button>

                            </div>
                        </div>
                    </div>


                </div>

            </div>


        )
    }
}
export default ChatApp;
