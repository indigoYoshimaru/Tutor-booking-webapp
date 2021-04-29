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
        let tutorId = decodedObj.tutorId;
        let tutor = await query_service.getUnverifiedTutorById(tutorId);
        delete tutor.Id;
        let result = await update_service.addTutor(tutor);
        console.log(result);
        await update_service.deleteUnverifiedTutor(tutorId);// query needs writing
        let addedTutor = await query_service.getRecentlyAddedTutor();
        if (!tutor) {
            return {
                error: "No tutor found"
            }
        }
        await update_service.addMoneyAccountByTutorId(addedTutor.Id);
        let tutorProfile = JSON.parse(addedTutor.Profile.Background);
        let teachingCourses = tutorProfile.Background;
        // for (var course in teachingCourses) {
        //     update_service.addTeachingCourses(tutorId, course.Id);// query needs writing
        // }
        for (var course in teachingCourses) {
            await update_service.addTeachingCourses(addedTutor.Id, course.Id);
        }

        return {
            result: "Tutor verified."
        }

    }
}

module.exports = TutorController
