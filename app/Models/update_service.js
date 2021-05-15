const Database = use('Database');

module.exports = {
    async addTutor(tutorInfo) {
        // await Database.raw(`SELECT * INTO tutor FROM unverifiedtutor as UT WHERE UT.Id =?`, parseInt(tutorId));
        let result = await Database.raw(`INSERT INTO tutor (FirstName, LastName, UserName,
            Email, Password, DateofBirth, Profile) VALUES(?,?,?,?,?,?,?)`,
            [tutorInfo.FirstName, tutorInfo.LastName, tutorInfo.UserName, tutorInfo.Email, tutorInfo.Password, tutorInfo.DateofBirth, JSON.stringify(tutorInfo.Profile)])
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
    async addCourseTeaching(tutorId, courseId) {
        await Database.raw(`INSERT INTO courseteaching (TutorId,CourseId) VALUES (?,?)`, [parseInt(tutorId), parseInt(courseId)]);

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
    async deleteUnverifiedTutor(unverTutorId) {
        await Database.raw(`DELETE FROM tutorweb.unverifiedtutor WHERE Id = ?`, [parseInt(unverTutorId)]);

    },

    /*==================*/
    async addContract(contract) {
        await Database.raw(`INSERT INTO contract (TutorId, TuteeId, StartDate, CloseDate, TeachingHours, State, ListOfTeachingDay) VALUES(?,?,?,?,?,?,?)`, [parseInt(contract.tutorId), parseInt(contract.tuteeId),
        contract.startDate, null, parseFloat(contract.teachingHours), 0, contract.listofTeachingDay]);
    },
    async addMoneyAccountByContractId(contractId) {
        let code = 'contract/' + contractId;
        await Database.raw(`INSERT INTO MoneyAccount (Code, BalanceAmount) VALUES(?,?)`, [code, 0])
    },
    async addMoneyAccountByTutorId(tutorId) {
        let code = 'tutor/' + tutorId;
        await Database.raw(`INSERT INTO MoneyAccount (Code,BalanceAmount) VALUES(?,?)`, [code, parseInt(0)])
    },
    async addMoneyAccountByTuteeId(tuteeId) {
        let code = 'tutee/' + tuteeId;
        await Database.raw(`INSERT INTO MoneyAccount (Code, BalanceAmount) VALUES(?,?)`, [code, 0])
    },
    async addTransaction(senderAccountId, receiverAccountId, amount) {
        await Database.raw(`INSERT INTO transaction (SenderAccountId, ReceiverAccountId, Amount) VALUES(?,?,?)`, [parseInt(senderAccountId), parseInt(receiverAccountId), parseFloat(amount)]);
    },
    async updateMoneyAccount(moneyAccountId, newBalance) {
        await Database.raw(`UPDATE MoneyAccount SET balanceAmount=? WHERE Id =?`, [parseFloat(newBalance), parseInt(moneyAccountId)])
    },
    async setIsCloseContract(contract) {
        await Database.raw(`UPDATE contract SET isClose=? WHERE Id =?`, [1, parseInt(contract.Id)]);
    },

    async addChatroom(tutorId, tuteeId) {
        await Database.raw(`INSERT INTO chatroom (TutorId, TuteeId) VALUES(?,?)`, [parseInt(tutorId), parseInt(tuteeId)])
    },

    async addMessage(chatroomId, isTutor, content) {
        await Database.raw(`INSERT INTO message (ChatroomId, IsTutor, Content) VALUES(?,?,?,?)`, [parseInt(chatroomId), parseInt(isTutor), content]) // erase timestamp for the sake of simplicity
    }
}