'use strict'

const { getAdminByUserName } = require("../../Models/query_service");
const query_service = require("../../Models/query_service");
const update_service = require("../../Models/update_service");

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
        let existedAccount=query_service.getTutorByUserName(tutor.username); 
        if (query_service.getTutorByUserName(tutor.username)||query_service.getTuteeByUserName(tutor.username)||getAdminByUserName(tutor.username))
            return {
                result: "Existed Username"
            }
        if (query_service.getTutorByEmail(tutor.email),query_service.getTuteeByEmail(email), query_service.getAdminByEmail(email))    
            return{
                result: "Email registered"
            }
        update_service.addUnverifiedTutor(tutor);
        return {
            result: "Please wait for admin verification."
        }
        
    }
}

module.exports = TutorController
