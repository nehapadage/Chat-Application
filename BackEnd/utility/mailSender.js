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
                console.log('Email sent: ', info);
                return callback(null, info)
            }
        });
    }

    

}


module.exports = new mailSender();