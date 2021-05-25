'use strict'

class ContractController {
    async checkOpenExpiration({ session, request }) {
        //check the open state of contract, if after 2 weeks from the start day tutor has not yet confirm
        // or after the 1st day of list of teaching day
        // we close the contract
    }

    async checkCloseExpiration({ session, request }) {
        //check the close state of the issue: close when create, open after 14 days since the last day of list of teaching days, close after confirm resolve

    }
}

module.exports = ContractController
