const Database = use('Database');

module.exports = {
    /*=====TUTOR=====*/
    async getTutors() {
        let [rows, _] = await Database.raw('SELECT * FROM tutor');
        if (!rows.length)
            return null;

        return rows;
    },

    async getTutorById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM tutor WHERE Id = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return rows[0];
    },

    async getUnverifiedTutorById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM unverifiedtutor WHERE Id = ?', parseInt(Id));
        if (!rows.length)
            return null;

        return rows[0];
    },

    async getTutorByUserName(username) {
        let [rows, _] = await Database.raw('SELECT * FROM tutor WHERE UserName =?', [username]);
        if (!rows.length)
            return null;

        return rows[0];
    },

    async getTutorByEmail(email) {
        let [rows, _] = await Database.raw('SELECT * FROM tutor WHERE Email =?', [email]);
        if (!rows.length)
            return null;

        return rows[0];
    },

    async getTutorByCourseName(courseName) {
        let [rows, _] = await Database.raw(`SELECT * FROM courseteaching 
        LEFT JOIN tutor ON tutor.Id=courseteaching.tutorId
        LEFT JOIN course ON course.Id = courseteaching.courseId
        WHERE course.name =? `, [courseName]);
        if (!rows.length)
            return null;

        return rows[0];
    },
    async getRecentlyAddedTutors() {
        let [rows, _] = await Database.raw('SELECT * FROM tutor ORDER BY DESC');
        if (!rows.length)
            return null;

        return rows[0];
    },

    /*=====TUTEE=====*/
    async getTutees() {
        let [rows, _] = await Database.raw('SELECT * FROM tutee');
        if (!rows.length)
            return null;

        return rows[0];
    },

    async getTuteeById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM tutee WHERE Id = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;
        console.log(rows);
        return rows[0];
    },

    async getTuteeByUserName(username) {
        let [rows, _] = await Database.raw('SELECT * FROM tutee WHERE UserName =?', [username]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getTuteeByEmail(email) {
        let [rows, _] = await Database.raw('SELECT * FROM tutee WHERE Email =?', [email]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getRecentlyAddedTutees() {
        let [rows, _] = await Database.raw('SELECT * FROM tutee ORDER BY DESC');
        if (!rows.length)
            return null;

        return rows[0];
    },

    /*=====ADMIN=====*/
    async getAdmins() {
        let [rows, _] = await Database.raw('SELECT * FROM admin');
        if (!rows.length)
            return null;

        return rows;
    },

    async getAdminById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM admin WHERE Id = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getAdminByUserName(username) {
        let [rows, _] = await Database.raw('SELECT * FROM admin WHERE UserName =?', [username]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getAdminByEmail(email) {
        let [rows, _] = await Database.raw('SELECT * FROM admin WHERE Email =?', [email]);
        if (!rows.length)
            return null;

        return rows;
    },

    /*=====ISSUE and CONTRACT=====*/
    async getContracts() {
        let [rows, _] = await Database.raw('SELECT * FROM contract');
        if (!rows.length)
            return null;

        return rows;
    },

    async getContractById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM contract WHERE Id = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getContractByTutorIdandTuteeId(tutorId, tuteeId) {
        let [rows, _] = await Database.raw('SELECT * FROM contract WHERE TutorId = ? AND TuteeId = ?', [parseInt(tutorId), parseInt(tuteeId)]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getIssues() {
        let [rows, _] = await Database.raw('SELECT * FROM issue');
        if (!rows.length)
            return null;

        return rows;
    },

    async getIssueById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM issue WHERE Id = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getIssueByContractId(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM issue WHERE ContractId = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getIssueByResolveAdminId(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM issue WHERE ResolveAdminId = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return rows;
    },

    /*=====MONEY ACCOUNT and TRANSACTION=====*/
    async getMoneyAccountByTutorId(tutorId) {
        var code = 'tutor/' + tutorId;
        let [rows, _] = await Database.raw('SELECT * FROM MoneyAccount WHERE Code=?', [code]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getMoneyAccountByTuteeId(tuteeId) {
        var code = 'tutee/' + tuteeId;
        let [rows, _] = await Database.raw('SELECT * FROM MoneyAccount WHERE Code=?', [code]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getMoneyAccountByCode(code) {
        let [rows, _] = await Database.raw('SELECT * FROM MoneyAccount WHERE Code=?', [code]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getMoneyAccountById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM MoneyAccount WHERE Id=?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getTransactions() {
        let [rows, _] = await Database.raw('SELECT * FROM Transaction');
        if (!rows.length)
            return null;

        return rows;
    },

    async getTransactionById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM Transaction WHERE Id=?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getTransactionbySenderAccountId(senderAccId) {
        let [rows, _] = await Database.raw('SELECT * FROM Transaction WHERE SenderAccountId=?', [parseInt(senderAccId)]);
        if (!rows.length)
            return null;

        return rows;
    },

    /*=====CHATROOM=====*/
    async getChatroomById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM Chatroom WHERE Id=?', [parseInt(Id)]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getChatroomByTutorIdandTuteeId(tutorId, tuteeId) {
        let [rows, _] = await Database.raw('SELECT * FROM Chatroom WHERE TutorId =? AND TuteeId=?', [parseInt(tutorId), parseInt(tuteeId)]);
        if (!rows.length)
            return null;

        return rows;
    },
    async getMessageByChatroomId(chatroomId) {
        let [rows, _] = await Database.raw('SELECT * FROM Message WHERE ChatroomId=?', [parseInt(chatroomId)]);
        if (!rows.length)
            return null;

        return rows;
    },
    async getMessageInChatroomByTutor(chatroomId) {
        let [rows, _] = await Database.raw('SELECT * FROM Message WHERE ChatroomId=? and IsTutor=1', [parseInt(chatroomId)]);
        if (!rows.length)
            return null;

        return rows;
    },
    async getMessageInChatroomByTutee(chatroomId) {
        let [rows, _] = await Database.raw('SELECT * FROM Message WHERE ChatroomId=? and IsTutor=0', [parseInt(chatroomId)]);
        if (!rows.length)
            return null;

        return rows;
    },

    /*=====EXTRA FUNCTIONS=====*/
    //for conflict resolve assignment, we get the admin who resolves least issue 
    async getLeastResolveAdmins() {
        let [rows, _] = await Database.raw(`SELECT *, SUM(num) FROM (
            SELECT * CASE WHEN Issue.Id is null THEN 0 ELSE 1 END as num
            FROM admin LEFT JOIN admin.Id=Issue.ResolveAdminId)
            AS t GROUP BY admin.Id ORDER BY SUM(num) asc
        ) `);
        if (!rows.length)
            return null
        return rows[0];

    }


}