const Database = use('Database');

module.exports = {
    /*=====TUTOR, TUTEE and ADMIN=====*/
    async getTutors() {
        let [rows, _] = await Database.raw('SELECT * FROM tutor');
        if (!rows.length)
            return null;
        
        return rows;
    },

    async getTutees() {
        let [rows, _] = await Database.raw('SELECT * FROM tutee');
        if (!rows.length)
            return null;
        
        return rows;
    },

    async getAdmins() {
        let [rows, _] = await Database.raw('SELECT * FROM admin');
        if (!rows.length)
            return null;
        
        return rows;
    },

    async getTutorById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM tutor WHERE Id = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;
        
        return rows;
    },

    async getTuteeById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM tutee WHERE Id = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;
        
        return rows;
    },

    async getAdminsById(Id) {
        let [rows, _] = await Database.raw('SELECT * FROM admin WHERE Id = ?', [parseInt(Id)]);
        if (!rows.length)
            return null;
        
        return rows;
    },

    async getTutorByUserName(userName) {
        let [rows, _] = await Database.raw('SELECT * FROM tutor WHERE UserName =?', [userName]);
        if (!rows.length)
            return null;
        
        return rows;
    },

    async getTuteeByUserName(userName) {
        let [rows, _] = await Database.raw('SELECT * FROM tutee WHERE UserName =?', [userName]);
        if (!rows.length)
            return null;
        
        return rows;
    },

    async getAdminByUserName(userName) {
        let [rows, _] = await Database.raw('SELECT * FROM admin WHERE UserName =?', [userName]);
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

    async getContractByTutorIdandTuteeId(tutorId,tuteeId) {
        let [rows, _] = await Database.raw('SELECT * FROM contract WHERE TutorId = ? AND TuteeId = ?', [parseInt(tutorId),parseInt(tuteeId)]);
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

    async getIssuesById(Id) {
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
        var code = 'tutee/' + tutorId;
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

    async getChatroomByTutorIdandTuteeId(tutorId,tuteeId) {
        let [rows, _] = await Database.raw('SELECT * FROM Chatroom WHERE TutorId =? AND TuteeId=?', [parseInt(tutorId),parseInt(tuteeId)]);
        if (!rows.length)
            return null;
        
        return rows;
    },
    async getMessageByChatRoomId(chatroomId) {
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
    }
}