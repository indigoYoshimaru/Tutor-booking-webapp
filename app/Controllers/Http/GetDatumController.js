'use strict'

const query_service = require("../../Models/query_service");

const Database = use('Database');
class GetDatumController {
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
}

module.exports = GetDatumController
