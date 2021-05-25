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
        let existed1 = await query_service.getTutorByUserName(tutee.username);
        let existed2 = await query_service.getTuteeByUserName(tutee.username);
        let existed3 = await query_service.getAdminByUserName(tutee.username);
        if (existed1 || existed2 || existed3 || await query_service.getUnverifiedTutorByUserName(tutee.username)) {
            console.log(existed1);
            return {
                result: "Existed Username"
            }
        }

        if (await query_service.getTutorByEmail(tutee.email) || await query_service.getTuteeByEmail(tutee.email) || await query_service.getAdminByEmail(tutee.email) || await query_service.getUnverifiedTutorByEmail(tutee.email)) // to be updated
            return {
                result: "Email registered"
            }
        tutee.password = await Hash.make(tutee.password);
        console.log(tutee.password);
        let token = jwt.sign(tutee, Config.get('app.appKey'));
        let host = Config.get('database.mysql.connection.host');
        let url = `${host}:3333/verify-tutee/${token}`;
        let content = `Please click this URL to verify account ${url}`;
        console.log(content);
        let res = await utility.sendMail(tutee.email, content);
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
        let tutee = decodedObj;
        await update_service.addTutee(tutee);
        tutee = await query_service.getRecentlyAddedTutee();
        console.log(tutee);
        if (!tutee)
            return {
                error: "No tutee found"
            }
        await update_service.addMoneyAccountByTuteeId(tutee.id); // needs checking
        return {
            result: "Tutee verified."
        }
    }

    async login({ request, session }) {
        let tutee = request.all()
        let tuteeDB = await query_service.getTuteeByUserName(tutee.username);
        if (!tuteeDB) {
            return {
                error: "No tutee with this username found"
            }
        }

        let isSamePassword = await Hash.verify(tutee.password, tuteeDB.password);
        if (!isSamePassword) {
            return {
                error: "Invalid password"
            }
        }
        let id = tuteeDB.id;
        let role = 'tutee';
        let tuteeObject = {
            id, role
        }

        let token = jwt.sign(tuteeObject, Config.get('app.appKey'));
        session.put("token", token);
        return {
            result: {
                "token": token,
                "message": "Login successfully."
            }
        }

    }

    async createContract({ request, session }) {
        let contract = request.all()
        let tutorDB = await query_service.getTutorById(contract.tutorId);
        let tuteeDB = await query_service.getTuteeById(contract.tuteeId);
        console.log(tutorDB);
        console.log(tuteeDB)
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
        let contractDB = await query_service.getContractByTutorIdandTuteeId(contract.tutorId, contract.tuteeId);
        if (contractDB && contractDB.state != 'CLOSED') { // contract is not closed
            return {
                error: "The contract has not been closed yet"
            }
        }
        //=====THIS IS IF INPUT FROM FRONT END IS JSON=====
        //dont need JSON parse here

        for (var i in contract.listofTeachingDay) { //loop through each teaching days
            let day = new Date(i) //parse teaching days to Date
            if (day < contract.startDate) {//|| day > contract.CloseDate compare with start and close date, CloseDate is contract's close date
                return {
                    error: "The teaching days are not in the contract's period"
                }
            }
        }


        /* IN CASE THE INPUT TEACHING DAYS IS AN ARRAY OF STRINGS */
        // let teachingDays = []
        // for (d in contract.ListOfTeachingDays) {
        //     if (d < contract.StartDate) {//compare with start and close date
        //         return {
        //             error: "The teaching days are not in the contract's period"
        //         }
        //     }
        //     teachingDays.push(d)
        // }
        // contract.ListOfTeachingDays = JSON.stringify(teachingDays)//convert array of days back to JSON but looks NOT GOOD


        //contract.listofTeachingDays = JSON.parse(contract.listofTeachingDays);
        console.log(contract);
        await update_service.addContract(contract)

        var amount = contract.teachingHours * 50000;
        let tutorAccount = await query_service.getMoneyAccountByTutorId(contract.tutorId)
        let tuteeAccount = await query_service.getMoneyAccountByTuteeId(contract.tuteeId)

        console.log(tutorAccount);
        return await utility.makeTransaction(tuteeAccount, tutorAccount, amount)
    }

    async contactTutor({ request, session }) {
        // if it's 1st time: create chatroom for tutor and tutee
        // if it's not: get all information of chat related between tutor and tutee
        let tutorId = request.all();
        let tuteeId = session.all();
        let tutor = await query_service.getTutorById(tutorId);
        if (!tutor) {
            return {
                error: "No tutor found"
            }
        }
        let tutee = await query_service.getTuteeById(tuteeId);
        if (!tutee) {
            return {
                error: "No tutee found"
            }
        }

        let chatroom = await query_service.getChatroomByTutorIdandTuteeId(tutorId, tuteeId);
        if (!chatroom) {
            update_service.addChatroom(tutorId, tuteeId);
            recentChatroom = query_service.getChatroomByTutorIdandTuteeId(tutorId, tuteeId);
            return {
                result: {
                    chatroom: recentChatroom,
                    messages: []
                }
            }
        }

        let messages = await query_service.getMessageByChatroomId(chatroom.id);
        return {
            result: {
                chatroom: chatroom,
                messages: messages
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

        let issue = await query_service.getIssueByContractId(contractId);
        if (issue && issue.isOpen) {
            return {
                error: "Issue of this contract is currently opened"
            }
        }


        let finalTeachingDate = contract[contract.length];
        let today = Date.now();
        if (today < finalTeachingDate) {
            return {
                error: "You cannot close the contract by now"
            }
        }

        let contractAccount = await query_service.getMoneyAccountByCode('contract/${contract.id}');
        let tutorAccount = await query_service.getMoneyAccountByCode('tutor/${contract.tutorId}')

        return await utility.makeTransaction(contractAccount, tutorAccount, contractAccount.amount);

    }

}

module.exports = TuteeController
