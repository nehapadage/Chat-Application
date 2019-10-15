var userSchema=require('../app/models')
// Create a User
class UserService{   
     createUserServices(req)
    {

      
        // Save User in the database
        user.save()
        .then(data => {
            res.send(data);
        })
    
    }
}

    
module.exports=new UserService();