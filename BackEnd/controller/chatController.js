var chatServices=require('../services/chatService')


class chatController{
    sendMessage(req,callback){
        try{
            console.log("chat controller");

            let sendMessageObject = {
                SenderName: req.SenderName,
                ReceiverName: req.ReceiverName,
                SenderId: req.SenderId,
                ReceiverId: req.ReceiverId,
                Messages: req.Messages
            }

            chatServices.sendMessageServices(sendMessageObject, (err, data) => {
                //send response to server
                var response={}
                if (err) {
                    response.success = false;
                    response.message = "error";
                    response.err = err
                    return callback(err)
                    // return res.status(422).send(response); // HTTP code 422-Client errors-unprocessable entity
                } else {
                    // response.success = data.success;
                    // response.message = data.message;
                    // response.data = data
                    // console.log("Response in chat controller"+JSON.stringify(response.data));
                    
                    return callback(null,data)
                    // return res.status(200).send(response); // HTTP code 200-successful response-Ok
                }
            })
        }
        catch(err){
            console.log(err);            
        }
    }

    receivedMessages(req,res){
        try{
            console.log("chat controller");

            chatServices.receivedMessagesServices((err, data) => {
                //send response to server
                var response={};
                if (err) {
                    response.success = false;
                    response.message = "error";
                    response.err = err
                    return res.status(422).send(response); // HTTP code 422-Client errors-unprocessable entity
                } else {
                    response.success = data.success;
                    response.message = data.message;                
                    response.data = data
                    // console.log("All users and messages in Chat Controller-----> " + response.data);   
                    return res.status(200).send(response); // HTTP code 200-successful response-Ok
                }
            })
        }
        catch(err){
            console.log(err);            
        }
    }
}
module.exports=new chatController();