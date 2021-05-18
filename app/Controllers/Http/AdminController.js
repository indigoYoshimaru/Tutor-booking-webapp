'use strict'

const query_service = require("../../Models/query_service");
const jwt = require('jsonwebtoken');
const Config = use('Config');
const utility = require("../../Models/utility");
const update_service = require("../../Models/update_service");
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
        let token = jwt.sign(tokenObj, Config.get('app.appKey'));
        let host = Config.get('database.mysql.connection.host');
        let url = `${host}:3333/verify-tutor/${token}`;
        let content = `Please click this URL to verify account ${url}`;
        console.log(content);
        let res = await utility.sendMail(tutor.Email, content);
        console.log(res);
        return res;
    }

    async login({ request, session }) {
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
        let role = 'admin'
        let adminObject = {
            adminId, role
        }

        let token = jwt.sign(adminObject, Config.get('app.appKey'));
        //add to session
        session.put('token', token);
        return {
            result: {
                "token": token,
                "message": "Login successfully."
            }
        }

    }

    async addNewAdmin({ request, session }) {
        let admin = request.all()
        let adminDB = await query_service.getAdminByUserName(admin.UserName);
        if (adminDB) {
            return {
                error: "Existed Username"
            }
        }

        admin.Password = await Hash.make(admin.Password);
        console.log(admin.Password);
        let token = jwt.sign(admin, Config.get('app.appKey'));
        let host = Config.get('database.mysql.connection.host');
        let url = `${host}:3333/verify-admin/${token}`;
        let content = `Please click this URL to verify account ${url}`;
        console.log(content);
        let res = await utility.sendMail(admin.Email, content);
        return res;

    }

    async verify({ request, session, params }) {
        let token = params.token;
        let decodedObj = jwt.verify(token, Config.get('app.appKey'));
        console.log(decodedObj);
        delete decodedObj.iat;
        if (!decodedObj)
            return {
                result: "No token decoded"
            }
        let admin = decodedObj;
        console.log(admin);
        await update_service.addAdmin(admin);
        admin = query_service.getRecentlyAddedAdmin();
        if (!admin)
            return {
                error: "No admin found"
            }
        return {
            result: "Admin verified and added."
        }
    }

    async banVerifiedTutor({ request, session }) {
        let tutor = request.all()
        let tutorDB = await query_service.getTutorById(tutor.tutorId)
        if (!tutorDB) {
            return {
                error: "No tutor with this Id"
            }
        }
        await update_service.deleteTutor(tutor.tutorId)
        await update_service.deleteCourseTeaching(tutor.tutorId)
        let check = await query_service.getTutorById(tutor.tutorId)
        if (check) {
            return {
                result: "Delete tutor failed"
            }
        }
        return {
            result: "Deleted Tutor"
        }
    }

    async banTutee({ request, session }) {
        let tutee = request.all()
        let tuteeDB = await query_service.getTuteeById(tutee.tuteeId)
        if (!tuteeDB) {
            return {
                error: "No tutee with this Id"
            }
        }
        await update_service.deleteTutee(tutee.tuteeId)
        let check = await query_service.getTuteeById(tutee.tuteeId)
        if (check) {
            return {
                result: "Delete tutee failed"
            }
        }
        return {
            result: "Deleted Tutee"
        }
    }
}

module.exports = AdminController
