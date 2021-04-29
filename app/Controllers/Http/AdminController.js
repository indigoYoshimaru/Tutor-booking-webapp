'use strict'

const query_service = require("../../Models/query_service");
const jwt = require('jsonwebtoken');
const Config = use('Config');
const utility = require("../../Models/utility");
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
    //comment for test register
    // async loginAsAdmin({ auth, request }) {
    //     const { username, password } = request.all();
    //     const asAdmin = auth.authenciator("admin");
    //     const token = await asAdmin.attempt(username, password);
    //     return 'Logged in successfully'
    // }

    // showAdmin({ auth, params }) {
    //     if (auth.admin.id !== Number(params.id)) { //to check the auth with current login id???
    //         return 'You cannot access this page'
    //     }
    //     return auth.admin
    // }

    async verifyTutorRegistration({ request, session }) {
        let req = request.all();
        let tutorId = req.tutorId;
        let adminId = session.adminId;

        // when admin click verify, we will send a link to verify email to tutor
        // when tutor click this link, we will add all of tutor information to official table
        let tutor = await query_service.getUnverifiedTutorById(tutorId);
        console.log(tutor);
        if (!tutor)
            return {
                result: "No tutor found"
            }

        let tokenObj = {
            adminId, tutorId
        }
        let token = jwt.sign(tokenObj, 'secretKey');
        let host = Config.get('database.mysql.connection.host');
        let url = `${host}:3333/verify-tutor/${token}`;
        let content = `Please click this URL to verify account ${url}`;
        console.log(content);
        let res = await utility.sendMail(tutor.Email, content);
        console.log(res);
        return res;
    }
}

module.exports = AdminController
