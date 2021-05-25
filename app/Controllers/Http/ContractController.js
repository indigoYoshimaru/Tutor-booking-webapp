'use strict'

const query_service = require("../../Models/query_service");
const update_service = require("../../Models/update_service");

class ExpirationController {
    async updateContractCloseExpiration({ session, request }) {
        //check the open state of contract, if after 2 weeks from the start day tutor has not yet confirm
        // or after the 1st day of list of teaching day
        // we close the contract

        let today = Date.now();
        var counter = 0;
        let contracts = await query_service.getWaitingContract();
        for (contract of contracts) {
            let firstTeachingDay = contract.listOfTeachingDay[0];
            let thresDate = new Date();
            thresDate.setDate(contract.startDate + 14);
            if (today > firstTeachingDay || today > thresDate) {
                await update_service.closeContract(contract.id);
                counter += 1;
            }
        }

        return {
            result: `There are ${counter} contract(s) closed without confirmation today`
        }

    }

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
}

module.exports = ExpirationController
