const nodemailer = require('nodemailer')
require('dotenv').config()

class mailSender {


    sendMail(email, url, callback) {

        console.log("Email in mail sender " + url);


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'neha02.padage@gmail.com',
                pass: 'Happy21096Family'
            }
        });

        var mailOptions = {
            from: 'neha02.padage@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            text: 'Reset password click link--'+url
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info);
                return callback(null, info)
            }
        });
    }

    //   nodemailSender(forgetPasswordDataObject,url,urlToken,callback){
    //  /** sending mail to user using nodemailer */
    //  console.log("user email",forgetPasswordDataObject);
    //  console.log("user password",process.env.USERPASSWORD);


    //  let transporter=nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user:process.env.USEREMAIL ,
    //       pass: process.env.USERPASSWORD
    //     }
    // });

    // let mailOptions = {
    //     from: 'neha02.padage@gmail.com',
    //     to:ingle0608,
    //     subject: 'Sending Email For reseting the password',
    //     text:url,
    //     html: '<h1>click on link for verification</h1><br><p>Click <a href="http://localhost:4005/resetPassword/' + urlToken + '">here</a> to reset your password</p><br><br>',

    //   };

    //   transporter.sendMail(mailOptions,(err,data)=>{
    //       if(err){
    //           console.log("Email not send")
    //           return callback(err)
    //       }else{
    //         console.log("\n\n\t\t Email send successfully");

    //         return callback(null,'Email sent: ' + data.response);
    //       }
    //   })

    //   }

}


module.exports = new mailSender();