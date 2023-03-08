'use strict'

import dotenv from 'dotenv'
import connection from '../../db/db-connection.js';

const config = dotenv.config()

const functions = {
  registerStudents: async function (teacher, students) {
    let queryStr = "INSERT INTO student (student_email, teacher_email, status) VALUES ?";
    let values = [];

    students.forEach(e => {
      values.push([e, teacher, true]);
    });
  
    return connection.promise().query(queryStr, [values], (err, data) => {
      if(err) {
        throw err;
      }
      return data;
    });
  },

  getCommonStudents: async function (query) {
    let queryStr = `SELECT student_email FROM student WHERE teacher_email = "${query}";`;
   
    return connection.promise().query(queryStr).then(data => {
      // return selected rows
      let studentEmail = [];
      if (data && data[0]?.length) {
        data[0].forEach(e => {
          studentEmail.push(e.student_email)
        })
      }
      return studentEmail;
    }).catch(err => {
      throw err;
    })
  },

  suspendStudent: async function (student) {
    let queryStr = `UPDATE student SET status = false WHERE student_email = "${student}";`;

    return connection.promise().query(queryStr).then(data => {
      return data;
    }).catch(err => {
      throw err;
    })
  },

  retrieveStudentForNoti: async function (teacher, notification) {
    let emailArr = [];
    // Regex to extract email from string, start with @
    if(notification) {
      let regex = /@(\S+)(?!\w)/g;
      let temp = notification.match(regex);
      temp?.forEach(e => {
        emailArr.push(e.substring(1)) // remove leading @
      })
    }

    let queryStr = `SELECT student_email FROM student `+ 
    `WHERE teacher_email = "${teacher}" AND status = true;`;

    return connection.promise().query(queryStr).then(data => {
      if (data && data[0]?.length) {
        data[0].forEach(e => {
          emailArr.push(e.student_email)
        })
      }
      return emailArr;
    }).catch(err => {
      throw err;
    })
  }
}

export default functions;

