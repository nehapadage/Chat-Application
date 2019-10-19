var model = require('../app/models/userSchema')
// Create a User
class UserService {
    
    
    createUserServices(createUserDataObject, callback) {
        try {
            //call model method for saving registration details
            model.createUser(createUserDataObject, (err, data) => {

                //send error to controller callback function
                if (err) {
                    return callback(err);
                }
                //send data to controller callback function 
                else {
                    return callback(null, data);
                }
            })
        } catch (error) {
            console.log(error);

        }

    }

    loginServices(loginDataObject, callback) {
        try {
            //call model method for saving login details
            model.loginUser(loginDataObject, (err, data) => {

                //send error to controller callback function
                if (err) {
                    return callback(err);
                }
                //send data to controller callback function 
                else {
                    return callback(null, data);
                }
            })
        } catch (error) {
            console.log(error);

        }

    }

    forgetPasswordServices(forgetPasswordDataObject, callback) {
        try {
            //call model method for saving forgetPassword details
            model.forgetPasswordUser(forgetPasswordDataObject, (err, data) => {

                //send error to controller callback function
                if (err) {
                    return callback(err);
                }
                //send data to controller callback function 
                else {
                    return callback(null, data);
                }
            })
        } catch (error) {
            console.log(error);

        }

    }

    resetPasswordServices(resetPasswordDataObject,callback) {
        try {
            //call model method for saving forgetPassword details
            model.resetPasswordUser(resetPasswordDataObject, (err, data) => {

                //send error to controller callback function
                if (err) {
                    return callback(err);
                }
                //send data to controller callback function 
                else {
                    return callback(null, data);
                }
            })
        } catch (error) {
            console.log(error);

        }

    }

}


module.exports = new UserService();