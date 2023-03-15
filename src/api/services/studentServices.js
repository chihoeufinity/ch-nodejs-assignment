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
        attributes: [
            'email'
        ],
        include:[{
            model: db.teacher,
            where: {email: teacherEmail}
        }],
        group: ['student.id', 'teachers.id']
    }).then(function (data, err) {
        if (err) {
            throw err;
        }
        let result = data.map(el => el.get({ plain: true })) || [];
        let studentEmail = [];
        if (result?.length) {
            result.forEach(e => {
               if (e.teachers.length === teacherEmail.length) {
                    studentEmail.push(e.email);
               }
            })
        }
        return studentEmail;
    });
  },

  suspendStudent: async function (student) {
    let studentData = await db.student.findOne({where: {email: student}});
    if (!studentData) {
        throw new Error("student does not exists");
    }
    if (!studentData.status) {
        throw new Error("student already suspended");
    }
    return await db.student.update(
        { status: false },
        { where: { email: student} }
    )
  },

  retrieveStudentForNoti: async function (teacher, students) {
    let teacherData = await db.teacher.findOne({where: {email: teacher}});
    if (!teacherData) {
        throw new Error("teacher does not exists");
    }
    let studentEmail = [];
    await db.student.findAll({where: {email: students}}).then(function (data, err) {
        let result = data.map(el => el.get({ plain: true })) || [];
        if (result?.length) {
            result.forEach(e => {
                studentEmail.push(e.email);
             })
        }
    });

    return await db.student.findAll({
        attributes: ['email'],
        raw: true,
        include:[{
            model: db.teacher,
            attributes: ['email'],
            where: {email: teacher}
        }],
        where: { status: true }
    }).then((data, err) => {
        if (err) {
            throw err;
        }

        if (data?.length) {
            data.forEach(e => {
                if (!studentEmail.includes(e.email)){
                    studentEmail.push(e.email);
                }
            })
        }

        if(!studentEmail.length) {
            throw new Error("No student found");
        }

        return studentEmail;
    });
  }
}

export default functions;

