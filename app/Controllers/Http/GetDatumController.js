'use strict'

const query_service = require("../../../database/query_service");

const Database = use('Database');
class GetDatumController {
    async getTutors({request}){
        // let tutors = await query_service.getTutors();
        // if (!tutors)
        //     return {
        //         error: 'no tutor found'
        //     }
        // return {
        //     result: tutors
        // }
        return [1, 'John', 'Cena', 'WWE', 'u cant see me', '2000-11-18', '{"GPA": {"Intro to AI": "3.75", "Intro to Computing": "3.9"}, "Description": "I am handsome"}']
    }
}

module.exports = GetDatumController
