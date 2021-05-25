'use strict'

const verify = require('jsonwebtoken/verify')
const GetDatumController = require('../app/Controllers/Http/GetDatumController')
const TuteeController = require('../app/Controllers/Http/TuteeController')

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
const nodemailer = use('nodemailer')

Route.on('/').render('welcome')

/*TUTOR ROUTES*/
Route.get('/general/get-tutors', 'GetDatumController.getTutors')
Route.post('/general/get-tutor-by-id', 'GetDatumController.getTutorById')
Route.post('/general/get-tutor-by-username', 'GetDatumController.getTutorByUserName')
Route.post('/general/get-tutor-by-email', 'GetDatumController.getTutorByEmail')
Route.post('/general/get-tutor-by-course-name', 'GetDatumController.getTutorByCourseName')
Route.get('/general/get-recently-added-tutor', 'GetDatumController.getRecentlyAddedTutor')

/*TUTEE ROUTES*/
Route.get('/general/get-tutees', 'GetDatumController.getTutees')
Route.post('/general/get-tutee-by-id', 'GetDatumController.getTuteeById')
Route.post('/general/get-tutee-by-username', 'GetDatumController.getTuteeByUserName')
Route.post('/general/get-tutee-by-email', 'GetDatumController.getTuteeByEmail')
Route.get('/general/get-recently-added-tutee', 'GetDatumController.getRecentlyAddedTutee')

/*ADMIN ROUTES*/
Route.get('/general/get-admins', 'GetDatumController.getAdmins')
Route.post('/general/get-admin-by-id', 'GetDatumController.getAdminById')
Route.post('/general/get-admin-by-username', 'GetDatumController.getAdminByUserName')
Route.get('/general/get-recently-added-admin', 'GetDatumController.getRecentlyAddedAdmin')

/*=====ISSUE and CONTRACT=====*/
Route.get('/general/get-contracts', 'GetDatumController.getContracts')
Route.post('/general/get-contract-by-id', 'GetDatumController.getContractById')
Route.post('/general/get-contract-by-tutor-id-and-tutee-id', 'GetDatumController.getContractByTutorIdAndTuteeId')
Route.get('/general/get-issues', 'GetDatumController.getIssues')
Route.post('/general/get-issue-by-id', 'GetDatumController.getIssueById')
Route.post('/general/get-issue-by-contract-id', 'GetDatumController.getIssueByContractId')
Route.post('/general/get-issue-by-resolve-admin-id', 'GetDatumController.getIssueByResolveAdminId')

/*=====MONEY ACCOUNT and TRANSACTION=====*/
Route.post('/general/get-money-account-by-tutor-id', 'GetDatumController.getMoneyAccountByTutorId')
Route.post('/general/get-money-account-by-tutee-id', 'GetDatumController.getMoneyAccountByTuteeId')
Route.post('/general/get-money-account-by-code', 'GetDatumController.getMoneyAccountByCode')
Route.post('/general/get-money-account-by-id', 'GetDatumController.getMoneyAccountById')
Route.get('/general/get-transactions', 'GetDatumController.getTransactions')
Route.post('/general/get-transaction-by-id', 'GetDatumController.getTransactionById')
Route.post('/general/get-transaction-by-sender-account-id', 'GetDatumController.getTransactionbySenderAccountId')

/*=====CHATROOM=====*/
Route.post('/general/get-chatroom-by-id', 'GetDatumController.getChatroomById')
Route.post('/general/get-chatroom-by-tutor-id-and-tutee-id', 'GetDatumController.getChatroomByTutorIdAndTuteeId')
Route.post('/general/get-message-by-chatroom-id', 'GetDatumController.getMessageByChatroomId')
Route.post('/general/get-message-in-chatroom-by-tutor', 'GetDatumController.getMessageInChatroomByTutor')
Route.post('/general/get-message-in-chatroom-by-tutee', 'GetDatumController.getMessageInChatroomByTutee')

/*=====EXTRA FUNCTIONS=====*/
Route.get('/general/get-least-resolve-admins', 'GetDatumController.getLeastResolveAdmins')

Route.post('/tutor/register', 'TutorController.register')
Route.post('/tutee/register', 'TuteeController.register')
Route.post('/admin/add-new-admin', 'AdminController.addNewAdmin')
Route.get('/verify-tutor/:token', 'TutorController.verify')
Route.get('/verify-tutee/:token', 'TuteeController.verify')
Route.get('/verify-admin/:token', 'AdminController.verify')
Route.post('/admin/verify-tutor-registration', 'AdminController.verifyTutorRegistration')

Route.post('/admin/login', 'AdminController.login')
Route.post('/tutee/login', 'TuteeController.login')
Route.post('/tutor/login', 'TutorController.login')

Route.post('/admin/ban-verified-tutor', 'AdminController.banVerifiedTutor')
Route.post('/admin/ban-tutee', 'AdminController.banTutee')
Route.post('/tutee/create-contract', 'TuteeController.createContract')
Route.get('/test-login', async function ({ session }) { // put this to middleware
    let token = session.get('token');
    if (token) {
        return { result: "logged in" }
    }

    return {
        error: "not logged in"
    }
})

Route.post('tutor/request-close-contract', 'TutorController.requestCloseContract')
Route.post('tutee/contact-tutor', 'TuteeController.contactTutor')
Route.post('tutee/request-close-contract', 'TuteeController.requestCloseContract')
Route.post('admin/add-new-admin', 'AdminController.addNewAdmin')
Route.post('admin/create-issue-resolution', 'AdminController.createIssueResolution')
Route.post('contract/update-contract-close-expiration', 'ContractController.updateContractCloseExpiration')
Route.post('contract/update-issue-open-expiration', 'ContractController.updateIssueOpenExpiration')
// Route
//     .get('users/:id', 'UserController.show')//page that can be access by admin
//     .middleware('auth:admin')
// Route
//     .get('users/:id', 'UserController.show')//page that can be access by tutor
//     .middleware('auth:tutor')
// Route
//     .get('users/:id', 'UserController.show') //pages that can be access by tutee
//     .middleware('auth:tutee')

// comment for testing register first