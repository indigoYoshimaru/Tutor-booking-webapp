'use strict'

const verify = require('jsonwebtoken/verify')
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
Route.get('/tutor/verify/:token','TutorController.verify')
Route.get('/tutee/verify/:token','TuteeController.verify')
Route.get('/testmailuti', 'UtilityController.testMail')
Route
    .post('login', 'UserController.login')
Route
    .get('users/:id', 'UserController.show')//page that can be access by admin
    .middleware('auth:admin')
Route
    .get('users/:id', 'UserController.show')//page that can be access by tutor
    .middleware('auth:tutor')
Route
    .get('users/:id', 'UserController.show') //pages that can be access by tutee
    .middleware('auth:tutee')