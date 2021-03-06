const { camel } = require("./formatter");

const Database = use('Database');

const emptyArray = [];

module.exports = {
    /*=====TUTOR=====*/
    async getTutors() {
        let [rows, _] = await Database.raw('SELECT * FROM tutor');
        if (!rows.length)
            return emptyArray;
        rows = rows.map(camel);
        return rows;
    },

    async getTutorById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM tutor WHERE Id = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getUnverifiedTutors() {
        let [rows, _] = await Database.raw('SELECT * FROM unverifiedtutor ORDER BY Id DESC');
        if (!rows.length)
            return emptyArray;
        rows = rows.map(camel);
        return rows;
    },

    async getUnverifiedTutorById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM unverifiedtutor WHERE Id = ?', parseInt(Id));
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getUnverifiedTutorByEmail(email) {
        let [rows, _] = await Database.raw('SELECT * FROM unverifiedtutor WHERE Email =?', [email]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },



    async getTutorByUserName(username) {
        let [rows, _] = await Database.raw('SELECT * FROM tutor WHERE UserName =?', [username]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getTutorByEmail(email) {
        let [rows, _] = await Database.raw('SELECT * FROM tutor WHERE Email =?', [email]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getTutorByCourseName(courseName) {
        let [rows, _] = await Database.raw(`SELECT * FROM courseteaching 
        LEFT JOIN tutor ON tutor.Id=courseteaching.tutorId
        LEFT JOIN course ON course.Id = courseteaching.courseId
        WHERE course.name =? `, [courseName]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getTutorByCourseId(courseId) {
        let [rows, _] = await Database.raw(`SELECT * FROM courseteaching 
        LEFT JOIN tutor ON tutor.Id=courseteaching.tutorId
        LEFT JOIN course ON course.Id = courseteaching.courseId
        WHERE course.Id =? `, [parseInt(courseId)]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },
    async getRecentlyAddedTutor() {
        let [rows, _] = await Database.raw('SELECT * FROM tutorweb.tutor ORDER BY Id DESC');
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    /*=====TUTEE=====*/
    async getTutees() {
        let [rows, _] = await Database.raw('SELECT * FROM tutee');
        if (!rows.length)
            return emptyArray;

        rows = rows.map(camel);
        return rows;
    },

    async getTuteeById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM tutee WHERE Id = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getTuteeByUserName(username) {
        let [rows, _] = await Database.raw('SELECT * FROM tutee WHERE UserName =?', [username]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getTuteeByEmail(email) {
        let [rows, _] = await Database.raw('SELECT * FROM tutee WHERE Email =?', [email]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getRecentlyAddedTutee() {
        let [rows, _] = await Database.raw('SELECT * FROM tutee ORDER BY Id DESC');
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    /*=====ADMIN=====*/
    async getAdmins() {
        let [rows, _] = await Database.raw('SELECT * FROM admin');
        if (!rows.length)
            return emptyArray;

        rows = rows.map(camel);
        return rows;
    },

    async getAdminById(id) {
        let [rows, _] = await Database.raw('SELECT * FROM admin WHERE Id = ?', [parseInt(id)]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getAdminByUserName(username) {
        let [rows, _] = await Database.raw('SELECT * FROM admin WHERE UserName =?', [username]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getAdminByEmail(email) {
        let [rows, _] = await Database.raw('SELECT * FROM admin WHERE Email =?', [email]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },


    async getRecentlyAddedAdmin() {
        let [rows, _] = await Database.raw('SELECT * FROM admin ORDER BY Id DESC');
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    /*=====ISSUE and CONTRACT=====*/
    async getContracts() {
        let [rows, _] = await Database.raw('SELECT * FROM contract');
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getContractsByTutorId(tutorId) {
        let [rows, _] = await Database.raw('SELECT * FROM contract WHERE TutorId = ? ORDER BY StartDate DESC', [parseInt(tutorId)]);
        if (!rows.length)
            return emptyArray;

        rows = rows.map(camel);
        return rows;
    },

    async getContractsByTuteeId(tuteeId) {
        let [rows, _] = await Database.raw('SELECT * FROM contract WHERE TuteeId = ?', [parseInt(tuteeId)]);
        if (!rows.length)
            return emptyArray;

        rows = rows.map(camel);
        return rows;
    },

    async getWaitingContract() {
        let [rows, _] = await Database.raw(`SELECT * FROM contract WHERE State ='WAITING'`);
        if (!rows.length)
            return emptyArray;

        rows = rows.map(camel);
        return rows;
    },

    async getContractById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM contract WHERE Id = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getContractByTutorIdandTuteeId(tutorId, tuteeId) {
        let [rows, _] = await Database.raw('SELECT * FROM contract WHERE TutorId = ? AND TuteeId = ?', [parseInt(tutorId), parseInt(tuteeId)]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getIssues() {
        let [rows, _] = await Database.raw('SELECT * FROM issue');
        if (!rows.length)
            return emptyArray;

        rows = rows.map(camel);
        return rows;
    },

    async getClosedIssues() {
        let [rows, _] = await Database.raw('SELECT * FROM issue WHERE issue.IsOpen=?', [false]);
        if (!rows.length)
            return emptyArray;
        rows = rows.map(camel);
        return rows;
    },

    async getIssueById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM issue WHERE Id = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getIssueByContractId(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM issue WHERE ContractId = ?', [parseInt(Id)]);
        if (!rows.length)
            return emptyArray;
        rows = rows.map(camel);
        return rows;
    },

    async getIssueByResolveAdminId(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM issue WHERE ResolveAdminId = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        rows = rows.map(camel);
        return rows;
    },

    /*=====MONEY ACCOUNT and TRANSACTION=====*/
    async getMoneyAccountByTutorId(tutorId) {
        var code = 'tutor/' + tutorId;
        let [rows, _] = await Database.raw('SELECT * FROM MoneyAccount WHERE Code=?', [code]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getMoneyAccountByTuteeId(tuteeId) {
        var code = 'tutee/' + tuteeId;
        let [rows, _] = await Database.raw('SELECT * FROM MoneyAccount WHERE Code=?', [code]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getMoneyAccountByCode(code) {
        let [rows, _] = await Database.raw('SELECT * FROM MoneyAccount WHERE Code=?', [code]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getMoneyAccountById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM MoneyAccount WHERE Id=?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getTransactions() {
        let [rows, _] = await Database.raw('SELECT * FROM Transaction');
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getTransactionById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM Transaction WHERE Id=?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getTransactionbySenderAccountId(senderAccId) {
        let [rows, _] = await Database.raw('SELECT * FROM Transaction WHERE SenderAccountId=?', [parseInt(senderAccId)]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    /*=====CHATROOM=====*/
    async getChatroomById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM Chatroom WHERE Id=?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },

    async getChatroomsByTutorId(tutorId) {
        let [rows, _] = await Database.raw('SELECT * FROM chatroom WHERE TutorId = ?', [parseInt(tutorId)]);
        if (!rows.length)
            return emptyArray;

        rows = rows.map(camel);
        return rows;
    },

    async getChatroomsByTuteeId(tuteeId) {
        let [rows, _] = await Database.raw('SELECT * FROM chatroom WHERE TuteeId = ?', [parseInt(tuteeId)]);
        if (!rows.length)
            return emptyArray;

        rows = rows.map(camel);
        return rows;
    },

    async getChatroomByTutorIdandTuteeId(tutorId, tuteeId) {
        let [rows, _] = await Database.raw('SELECT * FROM Chatroom WHERE TutorId =? AND TuteeId=?', [parseInt(tutorId), parseInt(tuteeId)]);
        if (!rows.length)
            return null;

        return camel(rows[0]);
    },
    async getMessageByChatroomId(chatroomId) {
        let [rows, _] = await Database.raw('SELECT * FROM Message WHERE ChatroomId=?', [parseInt(chatroomId)]);
        if (!rows.length)
            return emptyArray;

        rows = rows.map(camel);
        return rows;
    },
    async getMessageInChatroomByTutor(chatroomId) {
        let [rows, _] = await Database.raw('SELECT * FROM Message WHERE ChatroomId=? and IsTutor=1', [parseInt(chatroomId)]);
        if (!rows.length)
            return emptyArray;

        rows = rows.map(camel);
        return rows;
    },
    async getMessageInChatroomByTutee(chatroomId) {
        let [rows, _] = await Database.raw('SELECT * FROM Message WHERE ChatroomId=? and IsTutor=0', [parseInt(chatroomId)]);
        if (!rows.length)
            return emptyArray;

        rows = rows.map(camel);
        return rows;
    },

    /*=====EXTRA FUNCTIONS=====*/
    //for conflict resolve assignment, we get the admin who resolves least issue 
    async getLeastResolveAdmins() {
        let [rows, _] = await Database.raw(`SELECT Id, SUM(num) FROM (
			SELECT admin.Id,case WHEN Issue.Id is null THEN 0
            ELSE 1 END as num
            FROM admin LEFT JOIN issue on admin.Id=Issue.ResolveAdminId)
            AS t GROUP BY Id ORDER BY SUM(num) asc
        `);
        if (!rows.length)
            return null
        return camel(rows[0]);

    },

    async getUnverifiedTutorByUserName(username) {
        let [rows, _] = await Database.raw(`SELECT * FROM unverifiedtutor WHERE UserName=?`, [username]);
        if (!rows.length)
            return null
        return camel(rows[0]);
    },

    async getCourses() {
        let [rows, _] = await Database.raw(`SELECT * FROM course`);
        if (!rows.length)
            return emptyArray
        rows = rows.map(camel);
        return rows;
    }
}