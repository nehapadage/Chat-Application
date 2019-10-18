const mongoose = require('mongoose')
const bycrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    EmailId: String,
    Password: String
}, {
    timestamps: true
});

let User = mongoose.model('User', userSchema); //User is Name of Schema


// Function to encrypt password

function encryptPassword(Password, callback) {
    bycrypt.hash(Password, 10, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

class UserModelAPI {


    createUser(createUserDataObject, callback) {
        try {
            var response = {};

            /** find first email exits or not  
             * if exits terminate other logic return response
             * 
             */
            User.find({'EmailId': createUserDataObject.EmailId
            }, (err, data) => {
                /** if err or email already exits */

                /** when error occured */
                if (err) {
                    return callback(err);
                } else
                if (data.length > 0) {
                    /** when email is already present  */
                    console.log("\n\n\t email already exits");
                    response.success = false;
                    response.message="email already exits"
                    return callback(null, response);
                } else {

                    // console.log("\n\nbefore encryption Password :" + createUserDataObject.Password);

                    encryptPassword(createUserDataObject.Password, (err, encryptedPassword) => {

                        if (err) {
                            return callback(err + " Encryption Failed")
                        } else {

                            console.log("\n\n\tAfter encryption Password :" + encryptedPassword);

                            /** convert data object into json format to save into schema */

                            let createUserDetails = new User({
                                "FirstName": createUserDataObject.FirstName,
                                "LastName": createUserDataObject.LastName,
                                "EmailId": createUserDataObject.EmailId,
                                "Password": encryptedPassword
                            })

                    
                            /** 
                             * @purpose save registration data into schema 
                             * @returns data if schema save successfully
                             */
                            
                            createUserDetails.save((err, data) => {
                                if (err) {
                                    /** send error to service callback function */
                                    return callback(err)
                                } else {
                                    /** send message and data to service callback function */

                                    response.success = true;
                                    console.log("Registration Successful ............" + data.FirstName);
                                    return callback(null, response)


                                }
                            })
                        }
                    })
                }
            })
        } catch (e) {
            console.log(e);
        }
    }



    loginUser(loginDataObject, callback) {
        try {
            User.find({
                'EmailId': loginDataObject.EmailId
            }, (err, data) => {
                if (err) {
                    console.log("Error occured in finding email");
                    return callback(err);
                } else {

                    if (data.length > 0) {
                        console.log("Email matched in database");

                        var response = {};

                        bycrypt.compare(loginDataObject.Password, data[0].Password, (err, passwordCompareResult) => {
                            if (err) {
                                return callback(err);
                            } else {
                                if (passwordCompareResult) {

                                    response.success = true;
                                    response.message = "Yaaa Login Successful ";
                                    console.log("Login Successful ............" + data[0].FirstName);
                                    return callback(null, response)
                                } else {

                                    response.success = false;
                                    response.message = "Ohhh Your Password not matched ";
                                    console.log("Your Password not matched ------->" + response);
                                    return callback(null, response)
                                }
                            }

                        })
                    } else //When email not found
                    {
                        console.log("Login failed because Email not registered");
                        callback(null, false);

                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }



    forgetPasswordUser(forgetPasswordDataObject, callback) {

        console.log("forget password " + forgetPasswordDataObject.EmailId);

        User.find({
            "EmailId": forgetPasswordDataObject.EmailId
        }, (err, data) => {

            if (err) {
                callback(err)
            } else {
                console.log("------", data)
                if (data.length <= 0) {
                    console.log("Your Password not matched");
                    return callback(null, false);
                } else {
                    console.log("\n\n\t\t Your Password matched");



                    // forgetMail.nodemailSender(userForgetPasswordDataObject, url, jwtToken.token,(err, data) => {
                    //     if (err) {
                    //         return callback(err)
                    //     } else {
                    //         return callback(null, data)
                    //     }
                    // })

                }
            }
        })

    }




}

module.exports = new UserModelAPI()