'use strict'

const { getAdminByUserName } = require("../../Models/query_service");
const query_service = require("../../Models/query_service");
const update_service = require("../../Models/update_service");
const jwt = require("jsonwebtoken");
const { errorMonitor } = require("node:events");
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
    async register({request, session}){
        let tutor = request.all(); 
        //let existedAccount=query_service.getTutorByUserName(tutor.username); 
        if (query_service.getTutorByUserName(tutor.username)||query_service.getTuteeByUserName(tutor.username)||getAdminByUserName(tutor.username))
            return {
                result: "Existed Username"
            }
        if (query_service.getTutorByEmail(tutor.email),query_service.getTuteeByEmail(email), query_service.getAdminByEmail(email))    
            return{
                result: "Email registered"
            }
        tutor.password=Encryption.encrypt(tutor.password);
        update_service.addUnverifiedTutor(tutor);
        return {
            result: "Please wait for admin verification."
        }

    }
    async verify({request, session, params}){
        let token= params.token; 
        let decodedObj=jwt.verify(token,'secretKey');
        if (!decodedObj)
            return{
                error:"No token decoded"
            }
        let tutorId= decodedObj.tutorId;
        update_service.addTutor(tutorId);
        update_service.deleteUnverifiedTutor(tutorId);// query needs writing
        let tutor = query_service.getRecentlyAddedTutor(); 
        if (!tutor){
            return {
                error:"No tutor found"
            }
        }
        update_service.addMoneyAccountByTutorId(tutor.Id); 
        let tutorProfile = JSON.parse(tutor.Profile); 
        let teachingCourses= tutorProfile.Background; 
        for (var course in teachingCourses){
            update_service.addTeachingCourses(tutorId, course.Id);// query needs writing
        } 
        return{
            result: "Tutor verified."
        }

    }
}

module.exports = TutorController
