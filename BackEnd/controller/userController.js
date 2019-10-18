const userServices = require('../services/userServices');

class UserController {


    // Create and Save a new User                   
    createUser(req, res) {
        

        try {
            console.log(" controller");

            console.log(req.body);
            


            req.checkBody('FirstName', 'should not be empty').notEmpty(); //Validations
            req.checkBody('FirstName', 'should be Alphabet').isAlpha();

            req.checkBody('LastName', 'should not be empty').notEmpty();
            req.checkBody('LastName', 'should be Alphabet').isAlpha();

            req.checkBody('EmailId', 'should not be empty').notEmpty();
            req.checkBody('EmailId', 'should be Valid').isEmail();

            req.checkBody('Password', 'should not be empty').notEmpty();
            req.checkBody('Password', 'should have length 6').isLength({
                min: 6
            });
            req.checkBody('Password', 'should have maximum length 12').isLength({
                max: 12
            });

            let error = req.validationErrors();
            var response={};


            if (error) {
                response.success=false;
                response.message="Registrations failed due to validations error"
                response.error=error
                return res.status(422).send(response); // HTTP code 200-successful response-Ok
            } else {
                let createUserDataObject = {
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    EmailId: req.body.EmailId,
                    Password: req.body.Password,
                }

                //call userServices method and pass data object
                //callback get ans from userServices in the form of error and data

                userServices.createUserServices(createUserDataObject, (err, data) => {
                    //send response to server
                    if (err) {
                        response.success=false;
                        response.message = "error";
                        response.err = err
                        return res.status(422).send(response); // HTTP code 422-Client errors-unprocessable entity
                    } else {
                        response.success=data.success;
                        response.message = data.message;
                        response.data = data
                        return res.status(200).send(response); // HTTP code 200-successful response-Ok
                    }
                })
            }

        } catch (error) {
            console.log(error);
        }
    }



    login(req, res) {
        try {
            console.log(" in controller");

            req.checkBody('EmailId', 'should not be empty').notEmpty();
            req.checkBody('EmailId', 'should be Valid').isEmail();

            req.checkBody('Password', 'should not be empty').notEmpty();
            req.checkBody('Password', 'should have length 6').isLength({
                min: 6
            });
            req.checkBody('Password', 'should have maximum length 12').isLength({
                max: 12
            });

            let error = req.validationErrors();
            var response={};

            if (error) {
                response.success=false;
                response.message="Login failed due to validations error"
                response.error=error
                return res.status(200).send(response); // HTTP code 200-successful response-Ok
            } else {
                let loginDataObject = {
                    EmailId: req.body.EmailId,
                    Password: req.body.Password
                }

                //send loginDataObject to server & get responce from server
                userServices.loginServices(loginDataObject, (err, data) => {
                    
                    
                    if (err) {
                        response.success=false;
                        response.message = "error";
                        response.err = err
                        return res.status(422).send(response); // HTTP code 422-Client errors-unprocessable entity
                    } else {
                        response.success=data.success;
                        response.message = data.message;
                        response.data = data
                        return res.status(200).send(response); // HTTP code 200-successful response-Ok
                    }
                })

            }

        } catch (error) {
            console.log(error);

        }
    }

    forgetPassword(req, res) {
        try {
            console.log(" in controller");

            req.checkBody('EmailId', 'should not be empty').notEmpty();
            req.checkBody('EmailId', 'should be Valid').isEmail();

            let error = req.validationErrors();

            if (error) {
                return res.status(200).send(response); // HTTP code 200-successful response-Ok
            } else {
                let forgetPasswordDataObject = {
                    EmailId: req.body.EmailId,
                }

                userServices.forgetPasswordServices(forgetPasswordDataObject, (err, data) => {
                    //send response to server
                    if (err) {
                        return res.status(422).send(err); // HTTP code 422-Client errors-unprocessable entity
                    } else {
                        return res.status(200).send(data); // HTTP code 200-successful response-Ok
                    }
                })

            }

        } catch (error) {
            console.log(error);

        }
    }

    resetPassword(req, res) {
        try {

            req.checkBody('Password', 'should not be empty').notEmpty();
            req.checkBody('Password', 'should have length 6').isLength({
                min: 6
            });
            req.checkBody('Password', 'should have maximum length 12').isLength({
                max: 12
            });

            let error = req.validationErrors();

            if (error) {
                return res.status(200).send(response); // HTTP code 200-successful response-Ok
            } else {
                let resetPasswordDataObject = {
                    Password: req.body.Password,
                }








            }

        } catch (error) {
            console.log(error);

        }
    }

}
module.exports = new UserController();