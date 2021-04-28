'use strict'

const query_service = require("../../Models/query_service");

const Database = use('Database');
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
        let tutor = await query_service.getTutorById(parseInt(query.tutorId));
        if(!tutor)
            return {
                error: 'no tutor with this id'
            }
        return{
            result: tutor
        }
    }
    async getTutorByUsername({ request }) {
        let query = request.all();
        let tutor = await query_service.getTutorByUserName(query.tutorUsername);
        if(!tutor)
            return {
                error: 'no tutor with this username'
            }
        return{
            result: tutor
        }
    }
    async getTutorByEmail({ request }) {
        let query = request.all();
        let tutor = await query_service.getTutorByEmail(query.tutorEmail);
        if(!tutor)
            return {
                error: 'no tutor with this email'
            }
        return{
            result: tutor
        }
    }
    async getTutorByCourseName({ request }) {
        let query = request.all();
        let tutor = await query_service.getTutorByCourseName(query.coursename);
        if(!tutor)
            return {
                error:'no tutor teach this course'
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
        let tutee = await query_service.getTuteeById(parseInt(query.tuteeId));
        if(!tutee)
            return {
                error: 'no tutee with this id'
            }
        return{
            result: tutee
        }
    }
    async getTuteeByUserName({ request }) {
        let query = request.all();
        let tutee = await query_service.getTuteeByUserName(query.tuteeUsername);
        if(!tutee)
            return {
                error: 'no tutee with this username'
            }
        return{
            result: tutee
        }
    }
    async getTuteeByEmail({ request }) {
        let query = request.all();
        let tutee = await query_service.getTuteeByEmail(query.tuteeEmail);
        if(!tutee)
            return {
                error: 'no tutee with this email'
            }
        return{
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
        let admin = await query_service.getAdminById(parseInt(query.adminId));
        if(!admin)
            return {
                error: 'no admin with this id'
            }
        return{
            result: admin
        }
    }
    async getAdminByUserName({ request }) {
        let query = request.all();
        let admin = await query_service.getAdminByUserName(query.adminUsername);
        if(!admin)
            return {
                error: 'no admin with this username'
            }
        return{
            result: admin
        }
    }
    async getAdminByEmail({ request }) {
        let query = request.all();
        let admin = await query_service.getTuteeByEmail(query.adminEmail);
        if(!admin)
            return {
                error: 'no admin with this email'
            }
        return{
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
    
}

module.exports = GetDatumController
