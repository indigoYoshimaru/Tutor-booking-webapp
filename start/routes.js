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
Route.get('/verify/:token','TutorController.verify')
Route.get('/testmailuti', 'UtilityController.testMail')