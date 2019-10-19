const mongoose = require('mongoose')
const bycrypt = require('bcrypt')
const jwtTokenGenerator = require('/home/admin1/Desktop/Neha_Programs/chatapp/BackEnd/utility/tokenGenerator.js')
const mailSender = require('/home/admin1/Desktop/Neha_Programs/chatapp/BackEnd/utility/mailSender.js')

const userSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    EmailId: String,
    Password: String,
    Token: String
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
            User.find({
                'EmailId': createUserDataObject.EmailId
            }, (err, data) => {

                /** when error occured */
                if (err) {
                    return callback(err);
                } else
                if (data.length > 0) {
                    /** when email is already present  */
                    console.log("\n\n\t email already exits");
                    response.success = false;
                    response.message = "email already exits"
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

                        // var response = {};
                        let payload = {
                            '_id': data[0]._id,
                            'EmailId': data[0].EmailId
                        }

                        //get token from jwt
                        let jwtToken = jwtTokenGenerator.generateToken(payload);

                        bycrypt.compare(loginDataObject.Password, data[0].Password, (err, passwordCompareResult) => {
                            if (err) {
                                return callback(err);
                            } else {
                                if (passwordCompareResult) {
                                    console.log("Login Successful ............" + data[0].FirstName);
                                    let response = {
                                        '_id': data[0]._id,
                                        'FirstName': data[0].FirstName,
                                        'LastName': data[0].LastName,
                                        'EmailId': data[0].EmailId,
                                        'Token': jwtToken
                                    }
                                    response.success = true;
                                    response.message = "Yaaa Login Successful ";

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

                    let payload = {
                        '_id': data[0]._id
                    }

                    //get token from jwt
                    let jwtToken = jwtTokenGenerator.generateToken(payload);
                    console.log("Token is : " + jwtToken.token);

                    let url = "http://localhost:3000/resetPassword/" + jwtToken.token;


                    mailSender.sendMail(forgetPasswordDataObject.EmailId, url, (err, data) => {
                        if (err) {
                            return callback(err)
                        } else {
                            return callback(null, data)
                        }
                    })

                }
            }
        })

    }


    resetPasswordUser(resetPasswordDataObject, callback) {
        console.log("inside model password is " + resetPasswordDataObject.Password);
        console.log("id is" + resetPasswordDataObject._id);

        encryptPassword(resetPasswordDataObject.Password, (err, hashedPassword) => {
            if (err) {
                return callback(err);
            } else {
                User.findOneAndUpdate({
                    '_id': resetPasswordDataObject._id
                }, {
                    $set: {
                        'Password': hashedPassword
                    }
                }, (err, data) => {
                    if (err) {
                        console.log("update password error");
                        return callback(err + " update password error")
                    } else {
                        if (data) {
                            console.log("\n\n\t\t Password updation successfully");
                            return callback(null, data)
                        } else {
                            console.log("user credential not found");
                            return callback("user credential not found")
                        }
                    }
                })
            }
        })

    }

}

module.exports = new UserModelAPI()