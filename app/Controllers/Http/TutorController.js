'use strict'

const { getAdminByUserName } = require("../../Models/query_service");
const query_service = require("../../Models/query_service");
const update_service = require("../../Models/update_service");
const jwt = require("jsonwebtoken");
const Hash = use('Hash');
const Config = use('Config');

class TutorController {
    /*
    functions to be included:
        register
        login
        chat
        acceptContract
        rejectContract
        requestCloseContract
        confirmConflictResolution
    */
    async register({ request, session }) {
        let tutor = request.all();
        console.log(tutor.email);
        //let existedAccount=query_service.getTutorByUserName(tutor.username); 
        if (await query_service.getTutorByUserName(tutor.username) || await query_service.getTuteeByUserName(tutor.username) || await query_service.getAdminByUserName(tutor.username))// must add get unverify Tutor
            return {
                result: "Existed Username"
            }
        if (await query_service.getTutorByEmail(tutor.email) || await query_service.getTuteeByEmail(tutor.email) || await query_service.getAdminByEmail(tutor.email))
            return {
                result: "Email registered"
            }
        tutor.password = await Hash.make(tutor.password);
        await update_service.addUnverifiedTutor(tutor);
        return {
            result: "Please wait for admin verification."
        }

    }
    async verify({ request, session, params }) {
        let token = params.token;
        let decodedObj = jwt.verify(token, Config.get('app.appKey'));
        if (!decodedObj)
            return {
                error: "No token decoded"
            }

        let unverTutorId = decodedObj.tutor.id;
        let tutor = await query_service.getUnverifiedTutorById(unverTutorId);
        tutor.username = tutor.userName;
        console.log(tutor);
        let result = await update_service.addTutor(tutor);

        let addedTutor = await query_service.getRecentlyAddedTutor();
        if (!addedTutor) {
            return {
                error: "No tutor found"
            }
        }
        await update_service.addMoneyAccountByTutorId(addedTutor.id);

        let teachingCourses = addedTutor.profile.background;
        for (var course of teachingCourses) {
            console.log(course)
            await update_service.addCourseTeaching(addedTutor.id, course.id);
        }
        await update_service.deleteUnverifiedTutor(unverTutorId);
        return {
            result: "Tutor verified."
        }

    }

    async login({ request, session }) {
        let tutor = request.all()
        let tutorDB = await query_service.getTutorByUserName(tutor.username);
        if (!tutorDB) {
            return {
                error: "No tutor username found"
            }
        }

        let isSamePassword = await Hash.verify(tutor.password, tutorDB.password);
        if (!isSamePassword) {
            return {
                error: "Invalid password"
            }
        }
        let id = tutorDB.id;
        let role = 'tutor';
        let tutorObject = {
            id, role
        }

        let token = jwt.sign(tutorObject, Config.get('app.appKey'));
        session.put("token", token);
        return {
            result: {
                "token": token, // this is for testing only
                "message": "Login successfully."
            }
        }

    }

    async requestCloseContract({ request, session }) {
        let contractId = request.all();
        let contract = await query_service.getContractById(contractId);
        if (!contract) {
            return {
                error: "No contract found"
            }
        }

        if (issue && issue.isOpen) {
            return {
                error: "Issue of this contract is currently opened"
            }
        }

        let thresDate = new Date();
        thresDate.setDate(contract.listOfTeachingDay[contract.listOfTeachingDay.length - 1] + 14);

        let today = Date.now();
        if (today < thresDate) {
            return {
                error: "You cannot close the contract by now"
            }
        }

        let contractAccount = await query_service.getMoneyAccountByCode('contract/${contract.id}');
        let tutorAccount = await query_service.getMoneyAccountByCode('tutor/${contract.tutorId}')

        return await utility.makeTransaction(contractAccount, tutorAccount, contractAccount.amount);

    }
}

module.exports = TutorController
