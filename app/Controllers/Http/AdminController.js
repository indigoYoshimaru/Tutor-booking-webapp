'use strict'

const query_service = require("../../Models/query_service");
const jwt = require('jsonwebtoken');
const Config = use('Config');
const utility = require("../../Models/utility");
// const Encryption = use('Encryption');
const Hash = use('Hash');
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
    // async login({ auth, request }) {
    //     let admin = request.all();
    //     const asAdmin = auth.authenciator("admin");
    //     const token = await asAdmin.attempt(admin.UserName, admin.Password);

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

    async loginAsAdmin({ request, session }) {
        let admin = request.all()
        // validate admin account
        let adminDB = await query_service.getAdminByUserName(admin.UserName);
        if (!adminDB) {
            return {
                error: "No admin username found"
            }
        }

        let isSamePassword = await Hash.verify(admin.Password, adminDB.Password);
        if (!isSamePassword) {
            return {
                error: "Invalid password"
            }
        }
        // create Token
        let adminId = adminDB.Id;
        let adminUserName = adminDB.UserName;
        let adminObject = {
            adminId, adminUserName
        }

        let token = jwt.sign(adminObject, 'secretKey');
        //add to session
        session.token = token;
        return {
            result: {
                "token": token,
                "message": "Login successfully."
            }
        }

    }
}

module.exports = AdminController
