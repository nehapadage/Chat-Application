import socketIO from 'socket.io-client'

let socket;


class APIFunc {

    socketCon(){

        console.log("inside socket connection...");
        
       
        const endpoint = {
            response: false,
            endpoint: "http://localhost:4000"
        }

        socket = socketIO("http://localhost:4000")
    }

    Emitfun(sendObject){
        console.log("Emitted object"+JSON.stringify(sendObject));
        
        socket.emit('newMsg', sendObject);
        }


        // io.on('chat messages', function(message){
        //     console.log("Returned message ",message);
            
        // });



}

export default  new APIFunc()

