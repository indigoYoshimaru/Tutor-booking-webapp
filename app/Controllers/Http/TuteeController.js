'use strict'
const query_service = require("../../Models/query_service");
const update_service = require("../../Models/update_service");
const jwt = require("jsonwebtoken");
const Encryption = use('Encryption')

class TuteeController {
    /*
    functions to be included: 
        register
        login 
        contactTutor -> if 1st time: create chat btween tutor and tutee
        chat
        createContract
        raiseIssue
        confirmConflictResolution
    */
    async register({request,response}){
        // register --> sendmail --> click--> add
        let tutee=request.all();
        if (query_service.getTutorByUserName(tutee.username)||query_service.getTuteeByUserName(tutee.username)||getAdminByUserName(tutee.username))
            return {
                result: "Existed Username"
            }
        if (query_service.getTutorByEmail(tutee.email),query_service.getTuteeByEmail(tutee.email), query_service.getAdminByEmail(tutee.email))    
            return{
                result: "Email registered"
            }
        tutee.password=Encryption.encrypt(tutor.password);

        let token = jwt.sign(tutee,'secretKey');
        let host = config.host
        let url=`${host}/verify/${token}`;
        let content=`Click this URL to verify account ${url}`
        let res = UtilityController.mySendMail(tutee.email, content);
        return res;
    }

    async verify({request,response,params}){
        let token= params.token; 
        let decodedObj=jwt.verify(token,'secretKey');
        if (!decodedObj)
            return{
                result:"No token decoded"
            }
        let tutee= decodedObj.tutee;
        update_service.addTutee(tutee);
        //has to go home
    }
}

module.exports = TuteeController
