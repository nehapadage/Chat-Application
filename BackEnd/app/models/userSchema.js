const mongoose = require('mongoose')
const bycrypt = require('bcrypt')



const userSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    EmailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    Password: {
        type: String,
        required: true,
    },
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
            var response = {};
            User.find({
                'EmailId': loginDataObject.EmailId
            }, (err, data) => {
                if (err) {
                    console.log("Error occured in finding email");
                    return callback(err);
                } else {

                    if (data.length > 0) {
                        console.log("Email matched in database");

                        


                        bycrypt.compare(loginDataObject.Password, data[0].Password, (err, passwordCompareResult) => {
                            if (err) {
                                return callback(err);
                            } else {
                                if (passwordCompareResult) {
                                    console.log("Login Successful ............" + data);
                                    let result = {
                                        '_id': data[0]._id,
                                        'FirstName': data[0].FirstName,
                                        'LastName': data[0].LastName,
                                        'EmailId': data[0].EmailId,

                                    }
                                    response.success = true;
                                    response.message = "Yaaa Login Successful ";
                                    response.data = result

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
                        response.success = false;
                        response.message = "Login failed because Email not registered";
                        callback(null, response);

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
                response.success = false;
                response.message = " Error";
                response.error = err;

                return callback(response)

            } else {
                var response = {}
                console.log("------", data)
                if (data.length <= 0) {
                    console.log("Your Email not matched");
                    data.success = false;
                    data.message = " Your Email not matched";
                    response.content = data;

                    return callback(null, data)

                } else {
                    console.log("\n\n\t\t Your Email matched");
                    data.success = true;
                    return callback(null, data[0])

                }
            }
        })

    }


    resetPasswordUser(resetPasswordDataObject, callback) {
        console.log("inside model password is " + resetPasswordDataObject.Password);
        console.log("id is " + resetPasswordDataObject._id);

        encryptPassword(resetPasswordDataObject.Password, (err, hashedPassword) => {
            if (err) {
                return callback(err);
            } else {
                console.log("password-->", resetPasswordDataObject.Password);

                console.log("hash password-->", hashedPassword);

                User.findOneAndUpdate({
                    // 'EmailId': resetPasswordDataObject.EmailId
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

    getAllUsers(callback) {
        try {
            User.find({}, (err, data) => {
                var response = {};
                if (err) {
                    response.success = false;
                    response.message = " Error";
                    response.error = err;

                    return callback(response)

                } else {
                    //  console.log("All users-----> " + data);
                    return callback(null, data);
                }

            })
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = new UserModelAPI()