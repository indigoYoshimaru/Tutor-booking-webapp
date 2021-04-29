const Database = use('Database');

module.exports = {
    async addTutor(tutorInfo) {
        // await Database.raw(`SELECT * INTO tutor FROM unverifiedtutor as UT WHERE UT.Id =?`, parseInt(tutorId));
        let result = await Database.raw(`INSERT INTO tutor (FirstName, LastName, UserName,
            Email, Password, DateofBirth, Profile) VALUES(?,?,?,?,?,?,?)`,
            [tutorInfo.FirstName, tutorInfo.LastName, tutorInfo.UserName, tutorInfo.Email, tutorInfo.Password, tutorInfo.DateofBirth, tutorInfo.Profile])
        return result;
    },
    async addUnverifiedTutor(tutorInfo) {
        let result = await Database.raw(`INSERT INTO unverifiedtutor (FirstName, LastName, UserName,
            Email, Password, DateofBirth, Profile) VALUES(?,?,?,?,?,?,?)`, [tutorInfo.FirstName, tutorInfo.LastName, tutorInfo.UserName, tutorInfo.Email, tutorInfo.Password, tutorInfo.DateofBirth, tutorInfo.Profile])
    },
    async addTutee(tuteeInfo) {
        await Database.raw(`INSERT INTO tutee (FirstName, LastName, UserName, Email, Password, DateofBirth) VALUES(?,?,?,?,?,?)`, [tuteeInfo.FirstName, tuteeInfo.LastName, tuteeInfo.UserName, tuteeInfo.Email,
        tuteeInfo.Password, tuteeInfo.DateofBirth])
    },
    /*used by admins only*/
    async addCourse(name) {
        await Database.raw(`INSERT INTO Course (Name) VALUES(?)`, [name])
    },
    async addAdmin(adminInfo) {
        await Database.raw(`INSERT INTO Admin (FirstName, LastName, UserName, Email, Password, DateofBirth) VALUES(?,?,?,?,?,?)`, [adminInfo.FirstName, adminInfo.LastName, adminInfo.UserName,
        adminInfo.Password, adminInfo.DateOfBirth])
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
        await Database.raw(`INSERT INTO contract (TutorId, TuteeId, StartDate, CloseDate, TeachingHours, State, ListOfTeachingDay) VALUES(?,?,?,?,?,?,?)`, [parseInt(contract.tutorId), parseInt(contract.tuteeId),
        contract.startDate, contract.closeDate, parseFloat(teachingHours), 0, contract.listofTeachingDay]);
    },
    async addMoneyAccountByContractId(contractId) {
        let code = 'contract/' + contractId;
        await Database.raw(`INSERT INTO MoneyAccount (Code, BalanceAmount) VALUES(?,?)`, [code, 0])
    },
    async addMoneyAccountByTutorId(tutorId) {
        let code = 'tutor/' + tutorId;
        await Database.raw(`INSERT INTO MoneyAccount (Code, BalanceAmount) VALUES(?,?)`, [code, 0])
    },
    async addMoneyAccountByTuteeId(tuteeId) {
        let code = 'tutee/' + tuteeId;
        await Database.raw(`INSERT INTO MoneyAccount (Code, BalanceAmount) VALUES(?,?)`, [code, 0])
    },
    async addTransaction(transaction) {
        await Database.raw(`INSERT INTO transaction (Code, BalanceAmount) VALUES(?,?,?)`, [parseInt(transaction.senderAccountId), parseInt(transaction.receiverAccountId), parseFloat(amount)]);
    },
    async updateMoneyAccount(moneyAccount) {
        await Database.raw(`UPDATE MoneyAccount SET balanceAmount=? WHERE Id =?`, [parseFloat(moneyAccount.balanceAmount), parseInt(moneyAccount.Id)])
    },
    async setIsCloseContract(contract) {
        await Database.raw(`UPDATE contract SET isClose=? WHERE Id =?`, [1, parseInt(contract.Id)]);
    },

}