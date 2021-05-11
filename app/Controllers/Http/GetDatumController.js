'use strict'

const query_service = require("../../Models/query_service");

class GetDatumController {
    /*=====Tutor=====*/
    async getTutors({ request }) {
        let tutors = await query_service.getTutors();
        if (!tutors)
            return {
                error: 'no tutor found'
            }
        return {
            result: tutors
        }
    }
    async getTutorById({ request }) {
        let query = request.all();
        let tutor = await query_service.getTutorById(query.tutorId);
        if (!tutor)
            return {
                error: 'no tutor with this id'
            }
        return {
            result: tutor
        }
    }
    async getTutorByUserName({ request }) {
        let query = request.all();
        let tutor = await query_service.getTutorByUserName(query.tutorUsername);
        if (!tutor)
            return {
                error: 'no tutor with this username'
            }
        return {
            result: tutor
        }
    }
    async getTutorByEmail({ request }) {
        let query = request.all();
        let tutor = await query_service.getTutorByEmail(query.tutorEmail);
        if (!tutor)
            return {
                error: 'no tutor with this email'
            }
        return {
            result: tutor
        }
    }
    async getTutorByCourseName({ request }) {
        let query = request.all();
        let tutor = await query_service.getTutorByCourseName(query.courseName);
        if (!tutor)
            return {
                error: 'no tutor teach this course'
            }
        return {
            result: tutor
        }
    }
    async getRecentlyAddedTutor({ request }) {
        let tutor = await query_service.getRecentlyAddedTutor();
        if (!tutor)
            return {
                error: 'no tutor added recently'
            }
        return {
            result: tutor
        }
    }
    /*=====Tutee=====*/
    async getTutees({ request }) {
        let tutees = await query_service.getTutees();
        if (!tutees)
            return {
                error: 'no tutee found'
            }
        return {
            result: tutees
        }
    }
    async getTuteeById({ request }) {
        let query = request.all();
        let tutee = await query_service.getTuteeById(query.tuteeId);
        if (!tutee)
            return {
                error: 'no tutee with this id'
            }
        return {
            result: tutee
        }
    }
    async getTuteeByUserName({ request }) {
        let query = request.all();
        let tutee = await query_service.getTuteeByUserName(query.tuteeUsername);
        if (!tutee)
            return {
                error: 'no tutee with this username'
            }
        return {
            result: tutee
        }
    }
    async getTuteeByEmail({ request }) {
        let query = request.all();
        let tutee = await query_service.getTuteeByEmail(query.tuteeEmail);
        if (!tutee)
            return {
                error: 'no tutee with this email'
            }
        return {
            result: tutee
        }
    }
    async getRecentlyAddedTutee({ request }) {
        let tutee = await query_service.getRecentlyAddedTutee();
        if (!tutee)
            return {
                error: 'no tutee added recently'
            }
        return {
            result: tutee
        }
    }
    /*=====Admin=====*/
    async getAdmins({ request }) {
        let admins = await query_service.getAdmins();
        if (!admins)
            return {
                error: 'no admin found'
            }
        return {
            result: admins
        }
    }
    async getAdminById({ request }) {
        let query = request.all();
        let admin = await query_service.getAdminById(query.adminId);
        if (!admin)
            return {
                error: 'no admin with this id'
            }
        return {
            result: admin
        }
    }
    async getAdminByUserName({ request }) {
        let query = request.all();
        let admin = await query_service.getAdminByUserName(query.adminUsername);
        if (!admin)
            return {
                error: 'no admin with this username'
            }
        return {
            result: admin
        }
    }
    async getRecentlyAddedAdmin({ request }) {
        let admin = await query_service.getRecentlyAddedAdmin();
        if (!admin)
            return {
                error: 'no admin added recently'
            }
        return {
            result: admin
        }
    }
    /*=====ISSUE and CONTRACT=====*/
    async getContracts({ request }) {
        let contracts = await query_service.getContracts();
        if (!contracts)
            return {
                error: 'no contract found'
            }
        return {
            result: contracts
        }
    }
    async getContractById({ request }) {
        let query = request.all();
        let contract = await query_service.getContractById(query.contractId);
        if (!contract)
            return {
                error: 'no contract with this id'
            }
        return {
            result: contract
        }
    }
    async getContractByTutorIdAndTuteeId({ request }) {
        let query = request.all();
        let contract = await query_service.getContractByTutorIdandTuteeId(query.tutorId, query.tuteeId);
        if (!contract)
            return {
                error: 'no contract was made between this tutor and tutee'
            }
        return {
            result: contract
        }
    }
    async getIssues({ request }) {
        let issues = await query_service.getIssues();
        if (!issues)
            return {
                error: 'no issue found'
            }
        return {
            result: issues
        }
    }
    async getIssueById({ request }) {
        let query = request.all();
        let issue = await query_service.getIssueById(query.issueId);
        if (!issue)
            return {
                error: 'no issue with this id'
            }
        return {
            result: issue
        }
    }
    async getIssueByContractId({ request }) {
        let query = request.all();
        let issue = await query_service.getIssueByContractId(query.contractId);
        if (!issue)
            return {
                error: 'no issue with this contract'
            }
        return {
            result: issue
        }
    }
    async getIssueByResolveAdminId({ request }) {
        let query = request.all();
        let issue = await query_service.getIssueByResolveAdminId(query.adminId);
        if (!issue)
            return {
                error: 'no issue found solved by this admin'
            }
        return {
            result: issue
        }
    }

    /*=====MONEY ACCOUNT and TRANSACTION=====*/
    async getMoneyAccountByTutorId({ request }) {
        let query = request.all();
        let account = await query_service.getMoneyAccountByTutorId(query.tutorId);
        if (!account)
            return {
                error: 'no account of this tutor'
            }
        return {
            result: account
        }
    }
    async getMoneyAccountByTuteeId({ request }) {
        let query = request.all();
        let account = await query_service.getMoneyAccountByTuteeId(query.tuteeId);
        if (!account)
            return {
                error: 'no account of this tutee'
            }
        return {
            result: account
        }
    }
    async getMoneyAccountByCode({ request }) {
        let query = request.all();
        let account = await query_service.getMoneyAccountByCode(query.code);
        if (!account)
            return {
                error: 'no account with this code'
            }
        return {
            result: account
        }
    }
    async getMoneyAccountById({ request }) {
        let query = request.all();
        let account = await query_service.getMoneyAccountById(query.accountId);
        if (!account)
            return {
                error: 'no account with this id'
            }
        return {
            result: account
        }
    }
    async getTransactions({ request }) {
        let transaction = await query_service.getTransactions();
        if (!transaction)
            return {
                error: 'no transaction found'
            }
        return {
            result: transaction
        }
    }
    async getTransactionById({ request }) {
        let query = request.all();
        let transaction = await query_service.getTransactionById(query.transactionId);
        if (!transaction)
            return {
                error: 'no transaction with this id'
            }
        return {
            result: transaction
        }
    }
    async getTransactionbySenderAccountId({ request }) {
        let query = request.all();
        let transaction = await query_service.getTransactionbySenderAccountId(query.accountId);
        if (!transaction)
            return {
                error: 'no account with this id'
            }
        return {
            result: transaction
        }
    }

    /*=====CHATROOM=====*/
    async getChatroomById({ request }) {
        let query = request.all();
        let chatroom = await query_service.getChatroomById(query.chatroomId);
        if (!chatroom)
            return {
                error: 'no chatroom with this id'
            }
        return {
            result: chatroom
        }
    }
    async getChatroomByTutorIdAndTuteeId({ request }) {
        let query = request.all();
        let chatroom = await query_service.getChatroomByTutorIdandTuteeId(query.tutorId, query.tuteeId);
        if (!chatroom)
            return {
                error: 'no chatroom was made between this tutor and tutee'
            }
        return {
            result: chatroom
        }
    }
    async getMessageByChatroomId({ request }) {
        let query = request.all();
        let message = await query_service.getMessageByChatroomId(query.chatroomId);
        if (!message)
            return {
                error: 'no message in this chatroom'
            }
        return {
            result: message
        }
    }
    async getMessageInChatroomByTutor({ request }) {
        let query = request.all();
        let message = await query_service.getMessageInChatroomByTutor(query.chatroomId);
        if (!message)
            return {
                error: 'no message in this chatroom by tutor'
            }
        return {
            result: message
        }
    }
    async getMessageInChatroomByTutee({ request }) {
        let query = request.all();
        let message = await query_service.getMessageInChatroomByTutee(query.chatroomId);
        if (!message)
            return {
                error: 'no message in this chatroom by tutee'
            }
        return {
            result: message
        }
    }

    /*=====EXTRA FUNCTIONS=====*/
    async getLeastResolveAdmins({ request }) {
        let admins = await query_service.getLeastResolveAdmins();
        if (!admins)
            return {
                error: 'no admin found'
            }
        return {
            result: admins
        }
    }
}

module.exports = GetDatumController
