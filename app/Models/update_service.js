const Database = use('Database');

module.exports = {
    async addTutor(tutorId) {
        await Database.raw(`SELECT * INTO tutor FROM UnverifiedTutor as UT WHERE UT.Id =?`, parseInt(tutorId));

    },
    async addUnverifiedTutor(tutorInfo){
        await Database.raw(`INSERT INTO UnverifiedTutor VALUES(?,?,?,?,?,?,?)`, [tutorInfo.firstName, tutorInfo.lastName, tutorInfo.userName,
            tutorInfo.password,tutorInfo.dateOfBirth, tutorInfo.profile])
    },
    async addTutee(tuteeInfo) {
        await Database.raw(`INSERT INTO Tutor VALUES(?,?,?,?,?,?)`, [tuteeInfo.firstName, tuteeInfo.lastName, tuteeInfo.userName,
        tuteeInfo.password,tuteeInfo.dateOfBirth])
    }, 
    /*used by admins only*/
    async addCourse(name) {
        await Database.raw(`INSERT INTO Course VALUES(?)`, [name])
    },
    async addAdmin(adminInfo) {
        await Database.raw(`INSERT INTO Admin VALUES(?,?,?,?,?,?)`, [adminInfo.firstName, adminInfo.lastName, adminInfo.userName,
            adminInfo.password,adminInfo.dateOfBirth])
    },
    async deleteTutor(tutorId) {
        await Database.raw(`DELETE FROM Tutor where Id = ?`, [parseInt(tutorId)]);
    },
    /*==================*/
    async deleteTutee(tuteeId) {
        await Database.raw(`DELETE FROM Tutee where Id = ?`, [parseInt(tuteeId)]);
    },
    async deleteAdmin(adminId) {
        await Database.raw(`DELETE FROM Admin where Id = ?`, [parseInt(adminId)]);
    },
    async deleteCourseTeaching(tutorId) {
        await Database.raw(`DELETE FROM CourseTeaching where TutorId = ?`, [parseInt(tutorId)]);
    },

    /*==================*/
    async addContract(contract) {
        await Database.raw(`INSERT INTO contract VALUES(?,?,?,?,?,?,?)`, [parseInt(contract.tutorId), parseInt(contract.tuteeId),
        contract.startDate, contract.closeDate, parseFloat(teachingHours), 0, contract.listofTeachingDay]);
    },
    async addMoneyAccountByContractId(contractId) {
        let code = 'contract' + contractId;
        await Database.raw(`INSERT INTO MoneyAccount VALUES(?,?)`, [code, 0])
    },
    async addMoneyAccountByTutorId(tutorId) {
        let code = 'tutor' + tutorId;
        await Database.raw(`INSERT INTO MoneyAccount VALUES(?,?)`, [code, 0])
    },
    async addMoneyAccountByTuteeId(tuteeId) {
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