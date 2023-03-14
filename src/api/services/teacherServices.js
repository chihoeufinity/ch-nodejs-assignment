'use strict'

import db from '../models/index.js';

const functions = {
    registerTeacher: async function (teacher) {
        let teacherObj = {
            email: teacher
        }

        return await db.teacher.create(teacherObj).then(function (res, err) {
           if (err) {
            throw err;
           }
           return {teacher: teacher};
        });
    }
}

export default functions;