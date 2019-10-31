import React, { Component } from 'react'

import './chatapp.css'

class Message extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);

    }



    check() {


    }

    render() {
        var newStyle = (this.props.senderIdItem === localStorage.getItem('SenderId')) ? "senderMessage" : "reciverMessage"


        return (


            <div
                className={newStyle}
            >
                {this.props.MessagesItem}
            </div>


        )
    }


}

export default Message