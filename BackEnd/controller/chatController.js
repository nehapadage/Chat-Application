var chatServices=require('../services/chatService')


class chatController{
    sendMessage(req,res){
        try{
            console.log("chat controller");

            let sendMessageObject = {
                SenderName: req.body.SenderName,
                ReceiverName: req.body.ReceiverName,
                SenderId: req.body.SenderId,
                ReceiverId: req.body.ReceiverId,
                Messages: req.body.Messages
            }

            chatServices.sendMessageServices(sendMessageObject, (err, data) => {
                //send response to server
                var response={}
                if (err) {
                    response.success = false;
                    response.message = "error";
                    response.err = err
                    // return callback(err)
                    return res.status(422).send(response); // HTTP code 422-Client errors-unprocessable entity
                } else {
                    response.success = data.success;
                    response.message = data.message;
                    response.data = data
                    // return callback(null,response)
                    return res.status(200).send(response); // HTTP code 200-successful response-Ok
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
                    console.log("All users and messages in Chat Controller-----> " + response.data);   
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