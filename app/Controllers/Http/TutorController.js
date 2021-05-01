'use strict'

const { getAdminByUserName } = require("../../Models/query_service");
const query_service = require("../../Models/query_service");
const update_service = require("../../Models/update_service");
const jwt = require("jsonwebtoken");
const Encryption = use('Encryption')

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
        console.log(tutor.Email);
        //let existedAccount=query_service.getTutorByUserName(tutor.username); 
        if (await query_service.getTutorByUserName(tutor.UserName) || await query_service.getTuteeByUserName(tutor.UserName) || await getAdminByUserName(tutor.UserName))// must add get unverify Tutor
            return {
                result: "Existed Username"
            }
        if (await query_service.getTutorByEmail(tutor.Email) || await query_service.getTuteeByEmail(tutor.Email) || await query_service.getAdminByEmail(tutor.Email))
            return {
                result: "Email registered"
            }
        tutor.Password = Encryption.encrypt(tutor.Password);
        await update_service.addUnverifiedTutor(tutor);
        return {
            result: "Please wait for admin verification."
        }

    }
    async verify({ request, session, params }) {
        let token = params.token;
        let decodedObj = jwt.verify(token, 'secretKey');
        if (!decodedObj)
            return {
                error: "No token decoded"
            }
        let unverTutorId = decodedObj.tutorId;
        let tutor = await query_service.getUnverifiedTutorById(unverTutorId);
        let result = await update_service.addTutor(tutor);
        await update_service.deleteUnverifiedTutor(unverTutorId);
        let addedTutor = await query_service.getRecentlyAddedTutor();
        if (!addedTutor) {
            return {
                error: "No tutor found"
            }
        }
        await update_service.addMoneyAccountByTutorId(addedTutor.Id);

        let teachingCourses = addedTutor.Profile.Background;
        for (var course of teachingCourses) {
            await update_service.addCourseTeaching(addedTutor.Id, course.Id);
        }

        return {
            result: "Tutor verified."
        }

    }
}

module.exports = TutorController
