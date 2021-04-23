'use strict'

const GetDatumController = require('../app/Controllers/Http/GetDatumController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const nodemailer= use('nodemailer')

Route.on('/').render('welcome')
Route.get('/general/get-tutors', 'GetDatumController.getTutors')

Route.get('/testmail', async function({request, response}){
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
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
        text: `Click this URL to verify account`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        console.log(error);
        if (error) {
          return {
              result: error
            }
        }
        return {
            result: "Email Sent" +info
        } 
      });
})