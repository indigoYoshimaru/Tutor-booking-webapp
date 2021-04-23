'use strict'

const query_service = require("../../Models/query_service");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

class AdminController {
    /*
    functions to be included:
        login
        verifyTutorRegistration
        addNewAdmin
        banTutor
        banTutee
        createConflictResolution
    */

    async verifyTutorRegistration({request, session}){
        let req=request.all();
        let tutorId=req.tutorId;
        let adminId=session.adminId;
        
        // when admin click verify, we will send a link to verify email to tutor
        // when tutor click this link, we will add all of tutor information to official table
        tutor = query_service.getTutorById(tutorId);
        if (!tutor)
            return{
                result:"No tutor found"
            }

        let tokenObj={
            adminId, tutorId
        }
        let token = jwt.sign(tokenObj,'secretKey');
        let host = config.host
        let url=`${host}/verify/${token}`;

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: true,
            auth: {
              user: 'sendmailserviceweb@gmail.com',
              pass: '12211991LTK'
            }
          });
          
          var mailOptions = {
            from: 'sendmailserviceweb@gmail.com',
            to: 'shensafi235@gmail.com',
            subject: 'Test Send Mail',
            text: `Click this URL to verify account ${url}`
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

module.exports = AdminController
