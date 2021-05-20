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
        if (existed1 || existed2 || existed3 || await query_service.getUnverifiedTutorByUserName(tutee.UserName)) {
            console.log(existed1);
            return {
                result: "Existed Username"
            }
        }

        if (await query_service.getTutorByEmail(tutee.Email) || await query_service.getTuteeByEmail(tutee.Email) || await query_service.getAdminByEmail(tutee.Email) || await query_service.getUnverifiedTutorByUserName(tutee.UserName))
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
        await update_service.addTutee(tutee);
        tutee = await query_service.getRecentlyAddedTutee();
        console.log(tutee);
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
        let id = tuteeDB.Id;
        let role = 'tutee';
        let tuteeObject = {
            id, role
        }

        let token = jwt.sign(tuteeObject, 'secretKey');
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
        if (contractDB && contractDB.State != 'CLOSED') { // contract is not closed
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

        console.log(contract);
        await update_service.addContract(contract)

        console.log(tutorAccount);
    }

    async contactTutor({ request, session }) {
        // if it's 1st time: create chatroom for tutor and tutee
        // if it's not: get all information of chat related between tutor and tutee
        let tutorId = request.all();
        let tuteeId = session.all();
        let tutor = query_service.getTutorById(tutorId);
        if (!tutor) {
            return {
                error: "No tutor found"
            }
        }
        let tutee = query_service.getTuteeById(tuteeId);
        if (!tutee) {
            return {
                error: "No tutee found"
            }
        }

        let chatroom = query_service.getChatroomByTutorIdandTuteeId(tutorId, tuteeId);
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

        let messages = query_service.getMessageByChatroomId(chatroom.Id);
        return {
            result: {
                chatroom: chatroom,
                messages: messages
            }
        }
    }

    async raiseIssue({ request, session }) {
        let issue = request.all()
        let contractDB = await query_service.getContractById(issue.contracId)
        if(!contractDB) {
            return {
                error:"No contract with this id"
            }
        }
        if (issue.content == null) {
            return {
                error: "Content cannot be left blank"
            }
        }
        let resolveAdmin = await getLeastResolveAdmins()
        let newIssue = {
            contractId = issue.contracId,
            isTutor = 0,
            content = issue.content,
            resolveAdminId = resolveAdmin.Id
        }
        await addIssue(newIssue)
    }

    async confirmIssueResolution ({ request, session }) {
        let solution = request.all()
        let issue = await query_service.getIssueById(solution.issueId)
        if (!issue) {
            return {
                error: "No issue with this id"
            }
        }
        await update_service.tuteeConfirmIssueResolution(issue.Id)
    }
}

module.exports = TuteeController
