const chatModel=require('../app/models/chatModels')

class chatServices{
    sendMessageServices(sendMessageObject,callback){
        try{
            //call model method for saving send message details
            chatModel.sendMessage(sendMessageObject, (err, data) => {

                //send error to controller callback function
                if (err) {
                    return callback(err);
                }
                //send data to controller callback function 
                else {
                    return callback(null, data);
                }
            })
        }catch(err){
            console.log(err);        
        }
    }

    receivedMessagesServices(callback){
        try{
            //call model method for saving send message details
            chatModel.receivedMessages((err, data) => {

                //send error to controller callback function
                if (err) {
                    return callback(err);
                }
                //send data to controller callback function 
                else {
                    return callback(null, data);
                }
            })
        }catch(err){
            console.log(err);        
        }
    }
}
module.exports=new chatServices();