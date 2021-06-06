'use strict'

const { getAdminByUserName } = require("../../Models/query_service");
const query_service = require("../../Models/query_service");
const update_service = require("../../Models/update_service");
const utility = require("../../Models/utility");
const jwt = require("jsonwebtoken");
const { closeContract } = require("../../Models/update_service");
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
        console.log(tutor);
        //let existedAccount=query_service.getTutorByUserName(tutor.username); 
        if (await query_service.getTutorByUserName(tutor.username) || await query_service.getTuteeByUserName(tutor.username) || await query_service.getAdminByUserName(tutor.username))// must add get unverify Tutor
            return {
                error: "Existed Username"
            }
        if (await query_service.getTutorByEmail(tutor.email) || await query_service.getTuteeByEmail(tutor.email) || await query_service.getAdminByEmail(tutor.email))
            return {
                error: "Email registered"
            }
        tutor.password = await Hash.make(tutor.password);
        console.log(tutor.password)
        await update_service.addUnverifiedTutor(tutor);
        let unverifiedtutor = query_service.getUnverifiedTutorById(1);
        console.log(unverifiedtutor)
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

    async getTutorInfo({ request, session }) {
        let token = session.get('token');
        let decodedObj = jwt.verify(token, Config.get('app.appKey'));
        let tutorId = decodedObj.id;
        let tutor = await query_service.getTutorById(tutorId);
        if (!tutor) {
            return {
                error: "No tutor found"
            }
        }
        let moneyAccount = await query_service.getMoneyAccountByTutorId(tutorId);
        let contracts = await query_service.getContractsByTutorId(tutorId);
        
        let chatrooms = await query_service.getChatroomsByTutorId(tutorId);
        let dateOfBirth = tutor.dateOfBirth.toDateString();

        for (let contract of contracts) {
            contract.startDate = contract.startDate.toDateString();
            console.log(contract)
            let contractAccount = await query_service.getMoneyAccountByCode(`contract/${contract.id}`)
         
            if (contract.closeDate) {
                contract.closeDate = contract.closeDate.toDateString();
            }
            let listOfTeachingDay = [];
            for (let teachingDay of contract.listOfTeachingDay) {
                teachingDay = new Date(teachingDay)
                teachingDay = teachingDay.toDateString();
                listOfTeachingDay.push(teachingDay);
            }
            contract.listOfTeachingDay = listOfTeachingDay;
            if (!contractAccount) {
                contract.balanceAmount = 0;
                continue;
            }
            contract.balanceAmount = contractAccount.balanceAmount;
        }

        return {
            result: {
                firstName: tutor.firstName,
                lastName: tutor.lastName,
                role: decodedObj.role,
                balanceAmount: moneyAccount.balanceAmount,
                dateOfBirth: dateOfBirth,
                profile: tutor.profile,
                contracts: contracts,
                chatrooms: chatrooms
            }
        }

    }

    async requestCloseContract({ request, session }) {
        let contractId = request.all();

        contractId = contractId.contractId;
        let contract = await query_service.getContractById(contractId);
        if (!contract) {
            return {
                error: "No contract found"
            }
        }

        console.log(contract);
        let issue = await query_service.getIssueByContractId(contractId);
        if (issue && issue.isOpen) {
            return {
                error: "Issue of this contract is currently opened"
            }
        }

        let thresDate = new Date();
        console.log(contract.listOfTeachingDay[contract.listOfTeachingDay.length - 1])
        let lastTeachingDate = new Date(Date.parse(contract.listOfTeachingDay[contract.listOfTeachingDay.length - 1]));
        thresDate.setDate(lastTeachingDate.getDate() + 14);

        console.log(thresDate);
        let today = new Date(Date.now());
        if (today < thresDate) {
            return {
                error: "You cannot close the contract by now"
            }
        }

        let tutorId = contract.tutorId;

        let contractAccount = await query_service.getMoneyAccountByCode(`contract/${contractId}`);
        let tutorAccount = await query_service.getMoneyAccountByCode(`tutor/${tutorId}`)

        return await utility.makeTransaction(contractAccount, tutorAccount, contractAccount.balanceAmount);

    }

    async acceptContract({ request, session }) {
        let contract = request.all()
        let contractDB = await query_service.getContractById(contract.contractId)
        if (!contractDB) {
            return {
                error: "Invalid contract Id"
            }
        }
        console.log(contractDB);
        let contractAccount = await update_service.addMoneyAccountByContractId(contractDB.id);

        var amount = contractDB.teachingHours * 50000;
        // let tutorAccount = await query_service.getMoneyAccountByTutorId(contractDB.tutorId)
        let tuteeAccount = await query_service.getMoneyAccountByTuteeId(contractDB.tuteeId)
        let result = await utility.makeTransaction(tuteeAccount, contractAccount, amount);
        if (!result.result) {
            await update_service.closeContract(contractDB.id);
            return {
                error: result.error
            }
        }
        await update_service.openContract(contractDB.id);
        return {
            result: result.result
        }
    }

    async rejectContract({ request, session }) {
        let contract = request.all()
        let contractDB = await query_service.getContractById(contract.contractId)
        console.log(contractDB)
        if (!contractDB) {
            return {
                error: "Invalid contract Id"
            }
        }
        await update_service.rejectContract(contractDB.id);
        return {
            result: "Contract rejected"
        }
    }

    async raiseIssue({ request, session }) {
        let issue = request.all()
        let contractDB = await query_service.getContractById(issue.contractId)
        if (!contractDB) {
            return {
                error: "No contract with this id"
            }
        }
        if (issue.content == null) {
            return {
                error: "Content cannot be left blank"
            }
        }
        let resolveAdmin = await query_service.getLeastResolveAdmins()
        let newIssue = {
            contractId: issue.contractId,
            isTutor: true,
            content: issue.content,
            resolveAdminId: resolveAdmin.id
        }
        await update_service.addIssue(newIssue);
        return {
            result: "Issue added"
        }
    }

    async confirmIssueResolution({ request, session }) {
        let solution = request.all()
        let issue = await query_service.getIssueById(solution.issueId)
        if (!issue) {
            return {
                error: "No issue with this id"
            }
        }
        await update_service.tutorConfirmIssueResolution(issue.id);
        return {
            result: "Tutor confirmed"
        }
    }

}

module.exports = TutorController
