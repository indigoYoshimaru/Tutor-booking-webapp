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
        // when admin click verify, we will send a link to verify email to tutor
        // when tutor click this link, we will add all of tutor information to official table
        let tutor = await query_service.getUnverifiedTutorById(tutorId);
        console.log(tutor);
        if (!tutor)
            return {
                error: "No tutor found"
            }

        let tokenObj = {
            tutor
        }
        let token = jwt.sign(tokenObj, Config.get('app.appKey'));
        let host = Config.get('database.mysql.connection.host');
        let url = `${host}:3333/verify-tutor/${token}`;
        let content = `Please click this URL to verify account ${url}`;
        console.log(content);
        let res = await utility.sendMail(tutor.email, content);
        console.log(res);
        return {
            result: `Verify sucessfully. \n An email has sent to ${tutor.email}`
        }
    }

    async login({ request, session }) {
        let admin = request.all()
        // validate admin account
        let adminDB = await query_service.getAdminByUserName(admin.username);
        if (!adminDB) {
            return {
                error: "No admin username found"
            }
        }

        let isSamePassword = await Hash.verify(admin.password, adminDB.password);
        if (!isSamePassword) {
            return {
                error: "Invalid password"
            }
        }
        // create Token
        let id = adminDB.id;
        let role = 'admin'
        let adminObject = {
            id, role
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

    async getAdminInfo({ request, session }) {
        let token = session.get('token');
        let decodedObj = jwt.verify(token, Config.get('app.appKey'));
        let adminId = decodedObj.id;
        let admin = await query_service.getAdminById(adminId);
        console.log(admin);
        if (!admin) {
            return {
                error: "No admin found"
            }
        }
        let issues = await query_service.getIssueByResolveAdminId(adminId);
        return {
            result: {
                firstName: admin.firstName,
                lastName: admin.lastName,
                dateOfBirth: admin.dateOfBirth,
                email: admin.email,
                issues: issues
            }
        }
    }

    async addNewAdmin({ request, session }) {
        let admin = request.all()
        let adminDB = await query_service.getAdminByUserName(admin.username); // needs checking all types of usernames
        if (adminDB) {
            return {
                error: "Existed Username"
            }
        }

        admin.password = await Hash.make(admin.password);
        console.log(admin.password);
        let token = jwt.sign(admin, Config.get('app.appKey'));
        let host = Config.get('database.mysql.connection.host');
        let url = `${host}:3333/verify-admin/${token}`;
        let content = `Please click this URL to verify account ${url}`;
        console.log(content);
        let res = await utility.sendMail(admin.email, content);
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
        await update_service.deleteCourseTeaching(tutor.tutorId)
        await update_service.deleteTutor(tutor.tutorId)
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
        let tutee = request.all();
        console.log(tutee)
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
    async createIssueResolution({ request, session }) {
        let token = session.get('token');
        let adminObject = jwt.verify(token, Config.get('app.appKey'))
        if (!adminObject) {
            return {
                error: "Please log in as admin"
            }
        }
        let issue = request.all(); // in json: issue id and result percentage

        let issueDb = await query_service.getIssueById(issue.issueId);
        if (!issueDb) {
            return {
                error: "No issue found"
            }
        }
        console.log(adminObject);
        console.log(issueDb.resolveAdminId)

        if (issueDb.resolveAdminId != adminObject.id) {
            return {
                error: "You don't have rights to resolve this issue"
            }
        }

        if (!issueDb.isOpen) {
            return {
                error: "Can't resolve this issue right now"
            }
        }

        let newIssue = await update_service.updateIssuePercentage(issueDb.id, issue.returnPercentage);

        return {
            result: newIssue
        }

    }
}

module.exports = AdminController
