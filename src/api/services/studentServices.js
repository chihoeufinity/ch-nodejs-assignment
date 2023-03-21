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
    
    let existingStudent = await db.student.findAll({
        where: {email: students},
        raw: true
    });

    let existingStudentId = existingStudent.map(s => s.id) || [];

    // Get student email that not yet register in database
    let newStudentObj =  students.map(s => ({
        email: s
    })).filter(o1 => !existingStudent.some(o2 => o1.email === o2.email));

    let existingTeacherStudent = [];

    if (teacherId && existingStudentId) {
        // Get existing teacher-student relationship to skip adding these records
        existingTeacherStudent = await db.teacher_student.findAll({
            where: {
                teacher_id: teacherId,
                student_id: existingStudentId
            }, raw: true
        });
    }

    let newTeacherStudentRecord = existingStudent.filter(o1 => !existingTeacherStudent.some(o2 => o1.id === o2.student_id));

    return await db.sequelize.transaction(async (t) => {
        let studentId = [];
        await db.student.bulkCreate(newStudentObj, {transaction: t})
        .then(function (student, err) {
            if (err) {
             throw err;
            }
            const studentList = [...student, ...newTeacherStudentRecord];
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

  getCommonStudents: async function (teacherEmails) {
    let teacherData = await db.teacher.findAll({
        where: {email: teacherEmails},
    })
    if (!teacherData) {
        throw new Error("teacher does not exists");
    }

    return await db.student.findAll({
        attributes: [
            'email'
        ],
        include:[{
            model: db.teacher,
            where: {email: teacherEmails}
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
               if (e.teachers.length === teacherEmails.length) {
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
    if (studentData.is_suspended) {
        throw new Error("student already suspended");
    }
    return await db.student.update(
        { is_suspended: true },
        { where: { email: student} }
    )
  },

  retrieveStudentForNoti: async function (teacher, students) {
    let teacherData = await db.teacher.findOne({where: {email: teacher}});
    if (!teacherData) {
        throw new Error("teacher does not exists");
    }
    const mentionedStudent = db.student.findAll({where: {email: students, is_suspended: false}, raw: true});
    const registeredStudent = db.student.findAll({
        attributes: ['email'],
        raw: true,
        include:[{
            model: db.teacher,
            attributes: ['email'],
            where: {email: teacher}
        }],
        where: { is_suspended: false }
    });

    const res = await Promise.all([mentionedStudent, registeredStudent]);
    if(!res[0]?.length && !res[1]?.length) {
        throw new Error("No student found");
    }
    const studentObjArray = [...res[0], ...res[1]];
    let studentEmails = studentObjArray.map(s => s.email);
    studentEmails = [...new Set(studentEmails)];

    return studentEmails;
    
  }
}

export default functions;

