const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    emailId: String,
    Password: String
}, {
    timestamps: true
});

let User = mongoose.model('User', userSchema);

class UserModel{

    createUser(){
        const user = new User({
            FirstName: req.body.FirstName, 
            LastName: req.body.LastName,
            emailId :req.body.emailId,
            Password :req.body.Password
        });


        user.save((err,data)=>{
            
        })
    
    }
}
module.exports= new UserModel()