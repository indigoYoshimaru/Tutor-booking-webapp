'use strict'
const query_service = require("../../Models/query_service");
const update_service = require("../../Models/update_service");
const jwt = require("jsonwebtoken");
const utility = require("../../Models/utility");
const Config = use('Config');
const Hash = use('Hash');

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
    async register({ request, session }) {
        // register --> sendmail --> click--> add
        let tutee = request.all();
        console.log(tutee);
        let existed1 = await query_service.getTutorByUserName(tutee.UserName);
        let existed2 = await query_service.getTuteeByUserName(tutee.UserName);
        let existed3 = await query_service.getAdminByUserName(tutee.UserName);
        if (existed1 || existed2 || existed3) {
            console.log(existed1);
            return {
                result: "Existed Username"
            }
        }

        if (await query_service.getTutorByEmail(tutee.Email) || await query_service.getTuteeByEmail(tutee.Email) || await query_service.getAdminByEmail(tutee.Email))
            return {
                result: "Email registered"
            }
        tutee.Password = await Hash.make(tutee.Password);
        console.log(tutee.Password);
        let token = jwt.sign(tutee, 'secretKey');
        let host = Config.get('database.mysql.connection.host');
        let url = `${host}:3333/verify-tutee/${token}`;
        let content = `Please click this URL to verify account ${url}`;
        console.log(content);
        let res = await utility.sendMail(tutee.Email, content);
        return res;
    }

    async verify({ request, session, params }) {
        let token = params.token;
        let decodedObj = jwt.verify(token, 'secretKey');
        console.log(decodedObj);
        delete decodedObj.iat;
        if (!decodedObj)
            return {
                result: "No token decoded"
            }
        let tutee = decodedObj;
        console.log(tutee);
        await update_service.addTutee(tutee);
        tutee = query_service.getRecentlyAddedTutee();
        if (!tutee)
            return {
                error: "No tutee found"
            }
        await update_service.addMoneyAccountByTuteeId(tutee.Id);
        return {
            result: "Tutee verified."
        }
    }

    async loginAsTutee({ request, session }) {
        let tutee = request.all()
        let tuteeDB = await query_service.getTuteeByUserName(tutee.UserName);
        if (!tuteeDB) {
            return {
                error: "No tutee with this username found"
            }
        }

        let isSamePassword = await Hash.verify(tutee.Password, tuteeDB.Password);
        if (!isSamePassword) {
            return {
                error: "Invalid password"
            }
        }
        let tuteeId = tuteeDB.Id;
        let tuteeUserName = tuteeDB.UserName;
        let tuteeObject = {
            tuteeId, tuteeUserName
        }

        let token = jwt.sign(tuteeObject, 'secretKey');
        session.token = token;
        return {
            result: {
                "token": token,
                "message": "Login successfully."
            }
        }

    }
}

module.exports = TuteeController
