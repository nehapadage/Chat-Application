const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    SenderName: {
        type: String,
    required: true,
    },
    ReceiverName:{
        type: String,
    required: true,
    },
    SenderId: {
        type: String,
    required: true,
    },
    ReceiverId: {
        type: String,
    required: true,
    },
    Messages: {
        type: String,
    required: true,
    }
}, {
    timestamps: true
});

let Chat = mongoose.model('Chat', chatSchema); //Chat is Name of Schema

class ChatModelAPI{

sendMessage(sendMessageObject,callback){
 
    try{
        Chat.find({
            'SenderId': sendMessageObject.SenderId
        }, (err, data) => {

            /** when error occured */
            if (err) {
                return callback(err);
            } 
            else
            {           
                        /** convert data object into json format to save into schema */

                        let sendMessageDetails = new Chat({
                            "SenderName": sendMessageObject.SenderName,
                            "ReceiverName": sendMessageObject.ReceiverName,
                            "SenderId": sendMessageObject.SenderId,
                            "ReceiverId": sendMessageObject.ReceiverId,
                            "Messages":sendMessageObject.Messages
                        })


                        sendMessageDetails.save((err, data) => {
                            if (err) {
                                /** send error to service callback function */
                                return callback(err)
                            } else {
                                /** send message and data to service callback function */
                                var response={};
                                response.success = true;
                                console.log("Message sent Successfully ............" + data.SenderName);
                                return callback(null, response)


                            }
                        })
                    }
                })
            
    }catch(err){
        console.log(err);        
    }
}

receivedMessages(callback){
    try{
        Chat.find({ },(err, data) => {
            var response={};
            if (err) {
                response.success = false;
                response.message = " Error";
                response.error = err;

                return callback(response)

            } else {
                console.log("All users and messages in Chat Model-----> " + data);
                return callback(null,data);
            }

            })
    }catch(err){
        console.log(err);     
    }
}

}
module.exports = new ChatModelAPI()
