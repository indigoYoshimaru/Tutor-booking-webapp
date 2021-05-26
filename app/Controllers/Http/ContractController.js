'use strict'

const query_service = require("../../Models/query_service");
const update_service = require("../../Models/update_service");

class ContractController {
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


}

module.exports = ContractController
