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
        await update_service.addMoneyAccountByTuteeId(tutee.Id); // needs checking
        return {
            result: "Tutee verified."
        }
    }

    async login({ request, session }) {
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

    async createContract({ request, session }) {
        let contract = request.all()
        let tutorDB = await query_service.getTutorById(contract.tutorId)
        let tuteeDB = await query_service.getTuteeById(contract.tuteeId)
        if (!tutorDB) {
            return {
                error: "No tutor with this Id"
            }
        }
        if (!tuteeDB) {
            return {
                error: "No tutee with this Id"
            }
        }
        let contractDB = await query_service.getContractByTutorIdandTuteeId(contract.tutorId, contract.tuteeId)
        if (contractDB && contractDB.State == 'CLOSED') {
            return {
                error: "The contract has not been closed yet"
            }
        }
        /* =====THIS IS IF INPUT FROM FRONT END IS JSON=====
        let teachingDays = JSON.parse(contract.ListofTeachingDays) //parse JSON data type
        for (i in teachingDays.TeachingDays) { //loop through each teaching days
            i = new Date(i) //parse teaching days to Date
            if (i < contract.StartDate || i > contract.CloseDate) {//compare with start and close date
                return {
                    error: "The teaching days are not in the contract's period"
                }
            }
        } */

        /* IN CASE THE INPUT TEACHING DAYS IS AN ARRAY OF STRINGS */
        let teachingDays = []
        for (d in contract.ListOfTeachingDays) {
            if (d < contract.StartDate || d > contract.CloseDate) {//compare with start and close date
                return {
                    error: "The teaching days are not in the contract's period"
                }
            }
            teachingDays.push(d)
        }
        contract.ListOfTeachingDays = JSON.stringify(teachingDays)//convert array of days back to JSON but looks NOT GOOD

        await update_service.addContract(contract)

        var amount = contract.TeachingHours * 50000;
        let tutorAccount = await query_service.getMoneyAccountByTutorId(contract.tutorId)
        let tuteeAccount = await query_service.getMoneyAccountByTuteeId(contract.tuteeID)

        await makeTransaction(tuteeAccount, tutorAccount, amount)
    }
}

module.exports = TuteeController
