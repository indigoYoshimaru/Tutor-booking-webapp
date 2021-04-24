'use strict'
const nodemailer = require('nodemailer');

class UtilityController {
    async testMail(){
        console.log(this.mySendMail('shensafi235@gmail.com','hello hello hello').result);

    }
    async mySendMail(receiver,content){
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
            user: 'sendmailserviceweb@gmail.com',
            pass: '12211991LTK'
            }
        });
        console.log(receiver);
        console.log(content);
        let mailOptions = {
            from: 'sendmailserviceweb@gmail.com',
            to: receiver,
            subject: 'Test Send Mail',
            // text: `Click this URL to verify account ${url}`
            text: content
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            return {
                result: error
                }
            }
            return {
                result: "Email Sent" +info
            } 
        });
        
    }
}
module.exports = UtilityController
