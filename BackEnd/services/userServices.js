var model = require('../app/models/userSchema')
const jwtTokenGenerator = require('../utility/tokenGenerator')
const mailSender = require('../utility/mailSender')


class UserService {

    // Create a User
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
                    console.log("Response in services" ,data);
                    
                    let payload = {
                        '_id': data._id,
                        'EmailId': data.EmailId
                    }

                    //get token from jwt
                    let jwtToken = jwtTokenGenerator.generateToken(payload);
                    


                        data.token=jwtToken
                    
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
                    let payload = {
                        '_id': data._id


                    }
                    console.log("payload-->", payload);


                    //get token from jwt
                    let jwtToken = jwtTokenGenerator.generateToken(payload);
                    console.log("Token is : " + jwtToken.token);

                    let url = "http://localhost:3001/resetpassword/" + jwtToken.token;


                    mailSender.sendMail(forgetPasswordDataObject.EmailId, url, (err, resp) => {
                        if (err) {
                            var response = {}
                            response.success = false;
                            response.message = " Mail not sent due to error";
                            response.error = err;
                            return callback(response)
                        } else {

                            resp.success = true;
                            resp.message = " Mail sent";
                            resp.content = jwtToken.token;
                            resp.data = data;

                            return callback(null, resp)
                        }
                    })

                }
            })
        } catch (error) {
            console.log(error);

        }

    }

    resetPasswordServices(resetPasswordDataObject, callback) {
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

    getAllUsersServices(callback) {
        try {
            model.getAllUsers((err, data) => {

                //send error to controller callback function
                if (err) {
                    return callback(err);
                }
                //send data to controller callback function 
                else {
                    return callback(null, data);
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

}


module.exports = new UserService();