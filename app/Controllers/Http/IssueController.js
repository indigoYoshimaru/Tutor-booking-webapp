'use strict'

const query_service = require("../../Models/query_service");
const update_service = require("../../Models/update_service");
const jwt = require("jsonwebtoken");
const utility = require("../../Models/utility");
const { makeTransaction } = require("../../Models/utility");

class IssueController {

    async updateIssueOpenExpiration({ session, request }) {
        //check the close state of the issue: close when create, open after 14 days since the last day of list of teaching days, close after confirm resolve
        let today = Date.now();
        var counter = 0;
        let issues = await query_service.getClosedIssues();
        for (issue of issues) {
            let contract = await query_service.getContractById(issues.contractId);
            let lastTeachingDay = contract.listOfTeachingDay[contract.listOfTeachingDay.length - 1];
            let thresDate = new Date();
            thresDate.setDate(contract.lastTeachingDay + 14);
            if (today > thresDate) {
                await update_service.updateIssueState(contract.id, true);
                counter += 1;
            }
        }

        return {
            result: `There are ${counter} issue(s) open today`
        }
    }

    async closeIssue({ request, session }) {
        let issue = request.all()
        let issueDB = await query_service.getIssueById(issue.id)
        if (!issueDB) {
            return {
                error: "No issue with this Id"
            }
        }
        if (!issue.tutorAgreement || !issue.tuteeAgreement) {
            return {
                error: "Issue is not accepted yet"
            }
        }
        let contract = await query_service.getContractById(issueDB.contractId)
        var amount = contract.teachingHours * 50000;
        let tutorAccount = await query_service.getMoneyAccountByTutorId(contract.tutorId)
        let tuteeAccount = await query_service.getMoneyAccountByTuteeId(contract.tuteeId)
        await update_service.closeIssue(issue.Id)
        let returnAmount = amount * (1 - issueDB.returnPercentage)
        await makeTransaction(tutorAccount, tuteeAccount, returnAmount)
    }

}

module.exports = IssueController
