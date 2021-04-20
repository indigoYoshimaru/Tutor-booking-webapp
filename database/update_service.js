const Database = use('Database');

module.exports = {
    async addContract(contract) {
        await Database.raw(`INSERT INTO contract VALUES(?,?,?,?,?,?,?,?)`, [parseInt(contract.tutorId), parseInt(contract.tuteeId), parseFloat(contract.moneyAmount),
        contract.startDate, contract.closeDate, parseFloat(teachingHours), 0, contract.listofTeachingDay]);
    },
    async addMoneyAccount(contractId) {
        let code = 'contract' + contractId;
        await Database.raw(`INSERT INTO MoneyAccount VALUES(?,?)`, [code, 0])
    },
    async addMoneyAccount(tutorId) {
        let code = 'tutor' + tutorId;
        await Database.raw(`INSERT INTO MoneyAccount VALUES(?,?)`, [code, 0])
    },
    async addMoneyAccount(tuteeId) {
        let code = 'tutor' + tuteeId;
        await Database.raw(`INSERT INTO MoneyAccount VALUES(?,?)`, [code, 0])
    },
    async addTransaction(transaction) {
        await Database.raw(`INSERT INTO transaction VALUES(?,?,?)`, [parseInt(transaction.senderAccountId), parseInt(transaction.receiverAccountId), parseFloat(amount)]);
    },
    async updateMoneyAccount(moneyAccount) {
        await Database.raw(`UPDATE MoneyAccount SET balanceAmount=? WHERE Id =?`, [parseFloat(moneyAccount.balanceAmount), parseInt(moneyAccount.Id)])
    },
    async setIsCloseContract(contract) {
        await Database.raw(`UPDATE contract SET isClose=? WHERE Id =?`, [1, parseInt(contract.Id)]);
    },

}