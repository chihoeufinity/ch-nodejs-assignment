'use strict'

import db from '../models/index.js';

const functions = {
  registerStudents: async function (teacher, students) {
    let teacherId = await db.teacher.findOne({
        where: {email: teacher}, 
        attributes: ['id'],
        raw: true
    }).then(data => {
        if (!data?.id) {
            throw new Error("teacher does not exists");
        }
        return data.id;
    });
    
    let existingStudent = await db.student.findAll({where: {email: students}}) || [];

    let studentObj = students.map(s => ({
        email: s
    }));

    return await db.sequelize.transaction(async (t) => {
        let studentId = [];
        await db.student.bulkCreate(studentObj, {ignoreDuplicates: true, transaction: t})
        .then(function (student, err) {
            if (err) {
             throw err;
            }
            const studentList = [...student, ...existingStudent];
            studentId = studentList.map(s => s.id).filter(s => s != null);
            return student;
         });

        let teacherStudentObj = studentId.map(s => ({
            teacher_id: teacherId,
            student_id: s
        }));

        await db.teacher_student.bulkCreate(teacherStudentObj, {transaction: t});

        return {
            teacher: teacher,
            students: students
        };
    })
  },

  getCommonStudents: async function (query) {
    let teacherEmail = [];
    if (!Array.isArray(query)) {
      teacherEmail.push(query);
    } else {
      teacherEmail = query;
    }

    return await db.student.findAll({
        attributes: ['email'],
        raw: true,
        include:[{
            model: db.teacher,
            attributes: ['email'],
            where: {email: teacherEmail}
        }]
    }).then((data, err) => {
        if (err) {
            throw err;
        }

        let studentEmail = [];
        if (data?.length) {
            data.forEach(e => {
                if (!studentEmail.includes(e.email)){
                    studentEmail.push(e.email);
                }
            })
        }
        return studentEmail;
    });
  },

  suspendStudent: async function (student) {
    return await db.student.update(
        { status: false },
        { where: { email: student} }
    )
  },

  retrieveStudentForNoti: async function (teacher, students) {
    return await db.student.findAll({
        attributes: ['email'],
        raw: true,
        include:[{
            model: db.teacher,
            attributes: ['email'],
            where: {email: teacher}
        }]
    }).then((data, err) => {
        if (err) {
            throw err;
        }

        let studentEmail = students;
        if (data?.length) {
            data.forEach(e => {
                if (!studentEmail.includes(e.email)){
                    studentEmail.push(e.email);
                }
            })
        }
        return studentEmail;
    });
  }
}

export default functions;

