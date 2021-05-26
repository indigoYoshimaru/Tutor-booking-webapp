const query_service = require("./query_service");

const { camel } = require("./formatter");

const Database = use('Database');

module.exports = {
    async addTutor(tutorInfo) {
        let result = await Database.raw(`INSERT INTO tutor (FirstName, LastName, UserName,
            Email, Password, DateofBirth, Profile) VALUES(?,?,?,?,?,?,?)`,
            [tutorInfo.firstName, tutorInfo.lastName, tutorInfo.username, tutorInfo.email, tutorInfo.password, tutorInfo.dateOfBirth, JSON.stringify(tutorInfo.profile)])
        return result;
    },
    async addUnverifiedTutor(tutorInfo) {
        let result = await Database.raw(`INSERT INTO unverifiedtutor (FirstName, LastName, UserName,
            Email, Password, DateofBirth, Profile) VALUES(?,?,?,?,?,?,?)`, [tutorInfo.firstName, tutorInfo.lastName, tutorInfo.username, tutorInfo.email, tutorInfo.password, tutorInfo.dateOfBirth, tutorInfo.profile])
    },
    async addTutee(tuteeInfo) {
        await Database.raw(`INSERT INTO tutee (FirstName, LastName, UserName, Email, Password, DateofBirth) VALUES(?,?,?,?,?,?)`, [tuteeInfo.firstName, tuteeInfo.lastName, tuteeInfo.username, tuteeInfo.email,
        tuteeInfo.password, tuteeInfo.dateOfBirth])
    },
    /*used by admins only*/
    async addCourse(name) {
        await Database.raw(`INSERT INTO Course (Name) VALUES(?)`, [name])
    },
    async addCourseTeaching(tutorId, courseId) {
        await Database.raw(`INSERT INTO courseteaching (TutorId,CourseId) VALUES (?,?)`, [parseInt(tutorId), parseInt(courseId)]);

    },
    async addAdmin(adminInfo) {
        await Database.raw(`INSERT INTO Admin (FirstName, LastName, UserName, Email, Password, DateofBirth) VALUES(?,?,?,?,?,?)`, [adminInfo.firstName, adminInfo.lastName, adminInfo.username, adminInfo.email,
        adminInfo.password, adminInfo.dateOfBirth])
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
        await Database.raw(`INSERT INTO contract (TutorId, TuteeId, StartDate, CloseDate, TeachingHours, State, ListOfTeachingDay) VALUES(?,?,?,?,?,?,?)`
            , [parseInt(contract.tutorId), parseInt(contract.tuteeId),
            contract.startDate, null, parseFloat(contract.teachingHours), "WAITING", JSON.stringify(contract.listofTeachingDay)]);
    },
    async addMoneyAccountByContractId(contractId) {
        let code = 'contract/' + contractId;
        await Database.raw(`INSERT INTO moneyaccount (Code, BalanceAmount) VALUES(?,?)`, [code, 100000]);
        let [rows, _] = await Database.raw("SELECT * FROM moneyaccount WHERE Id= (select LAST_INSERT_ID());")
        if (!rows.length) {
            return null;
        }
        console.log(rows)
        return camel(rows[0]);
    },
    async addMoneyAccountByTutorId(tutorId) {
        let code = 'tutor/' + tutorId;
        await Database.raw(`INSERT INTO moneyaccount (Code,BalanceAmount) VALUES(?,?)`, [code, 100000])
    },
    async addMoneyAccountByTuteeId(tuteeId) {
        let code = 'tutee/' + tuteeId;
        await Database.raw(`INSERT INTO moneyaccount (Code, BalanceAmount) VALUES(?,?)`, [code, 100000])
    },
    async addTransaction(senderAccountId, receiverAccountId, amount) {
        await Database.raw(`INSERT INTO transaction (SenderAccountId, ReceiverAccountId, Amount) VALUES(?,?,?)`, [parseInt(senderAccountId), parseInt(receiverAccountId), parseFloat(amount)]);
    },
    async updateMoneyAccount(moneyAccountId, newBalance) {
        console.log(newBalance)
        await Database.raw(`UPDATE moneyaccount SET BalanceAmount=? WHERE Id =?`, [parseFloat(newBalance), parseInt(moneyAccountId)])
    },

    async addChatroom(tutorId, tuteeId) {
        await Database.raw(`INSERT INTO chatroom (TutorId, TuteeId) VALUES(?,?)`, [parseInt(tutorId), parseInt(tuteeId)])
    },

    async addMessage(chatroomId, isTutor, content) {
        await Database.raw("INSERT INTO message (ChatroomId, IsTutor, Timestamp, Content) VALUES(?,?,now(),?);", [parseInt(chatroomId), isTutor, content])
        let [rows, _] = await Database.raw("SELECT * FROM message WHERE Id= (select LAST_INSERT_ID());")
        if (!rows.length) {
            return null;
        }

        return camel(rows[0]);
    },

    async updateIssuePercentage(issueId, returnPercentage) {
        await Database.raw("UPDATE issue SET ReturnPercentage=? WHERE Id =?", [parseFloat(returnPercentage), parseInt(issueId)]);
    },

    async updateIssueState(issueId, state) {
        await Database.raw("UPDATE issue SET isOpen=? WHERE Id =?", [state, parseInt(issueId)]);
    },

    async closeContract(contractId) {
        await Database.raw(`UPDATE contract SET State="CLOSED",CloseDate=now() WHERE Id=?`, [parseInt(contractId)]);
    },

    async openContract(contractId) {
        console.log(contractId);
        await Database.raw(`UPDATE contract SET State=? WHERE Id =?`, ['OPEN', parseInt(contractId)]);
    },
    async rejectContract(contractId) {
        await Database.raw(`UPDATE contract SET State=? WHERE Id =?`, ['REJECTED', parseInt(contractId)]);
    },

    async addIssue(issue) {
        await Database.raw(`INSERT INTO issue (ContractId, Content, IsOpen, ResolveAdminId, TutorAgreement, TuteeAgreement, IsFromTutor) VALUES(?,?,?,?,?,?,?)`,
            [parseInt(issue.contractId), issue.content, 0, parseInt(issue.resolveAdminId), 0, 0, issue.isTutor])
    },

    async tutorConfirmIssueResolution(issueId) {
        await Database.raw(`UPDATE issue SET TutorAgreement=? WHERE Id=?`, [true, parseInt(issueId)])
    },
    async tuteeConfirmIssueResolution(issueId) {
        await Database.raw(`UPDATE issue SET TuteeAgreement=? WHERE Id=?`, [true, parseInt(issueId)])
    },

    async closeIssue(issueId) {
        await Database.raw(`UPDATE issue SET IsOpen=? WHERE Id=?`, [false, parseInt(issueId)])
    }
}