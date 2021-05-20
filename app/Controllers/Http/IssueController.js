'use strict'

const query_service = require("../../Models/query_service");
const update_service = require("../../Models/update_service");
const jwt = require("jsonwebtoken");
const utility = require("../../Models/utility");
const { makeTransaction } = require("../../Models/utility");

class IssueController {
    async closeIssue({ request, session }) {
        let issue = request.all()
        let issueDB = await query_service.getIssueById(issue.Id)
        if(!issueDB) {
            return {
                error: "No issue with this Id"
            }
        }
        if (issue.tutorAgreement!=1 | issue.tuteeAgreement!=1) {
            return {
                error: "Issue is not accepted yet"
            }
        }
        let contract = await query_service.getContractById(issueDB.contractId)
        var amount = contract.teachingHours * 50000;
        let tutorAccount = await query_service.getMoneyAccountByTutorId(contract.tutorId)
        let tuteeAccount = await query_service.getMoneyAccountByTuteeId(contract.tuteeId)
        await update_service.closeIssue(issue.Id)
        let returnAmount = amount*(1-issueDB.returnPercentage)
        await makeTransaction(tutorAccount, tuteeAccount, returnAmount)
    }
}

module.exports = IssueController
