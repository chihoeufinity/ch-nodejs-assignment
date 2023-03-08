import request from 'supertest';
import mysql from 'mysql2';
import chai from 'chai';
import app from '../app.js';
import { after } from 'mocha';
import dotenv from 'dotenv'

const config = dotenv.config()
const expect = chai.expect;
// create the connection to database
const connection = mysql.createConnection({
    host: config.parsed.DB_HOST,
    user: config.parsed.DB_USER,
    database: config.parsed.DB_NAME,
    password: config.parsed.DB_PASSWORD,
});

after(function() {
    let query = `DELETE FROM student WHERE teacher_email="test_teacher@gmail.com";`;
            
    connection.query(query, function (err, result) {
        if (err) throw err;
    });
})

describe("POST /api/register", () => {
    it("should register student", async () => {
      const res = await request(app).post("/api/register").send({
        "teacher": "test_teacher@gmail.com",
        "students":
        [
            "test_student_1@gmail.com",
            "test_student_2@gmail.com",
        ]
      });
      expect(res.statusCode).to.equal(200);
    });
});

describe("GET /api/commonstudents", () => {
    it("should return common students", async () => {
      const res = await request(app).get("/api/commonstudents?teacher=test_teacher%40gmail.com");
      expect(res.statusCode).to.equal(200);
      expect(res.body.students.length).to.be.gt(0);
    });
});

describe("POST /api/suspend", () => {
    it("should suspend student", async () => {
      const res = await request(app).post("/api/suspend").send({
            "student" : "test_student_1@gmail.com"
      });
      expect(res.statusCode).to.equal(200);
    });
});

describe("POST /api/retrievefornotifications", () => {
    it("should retrieve list of students for notification", async () => {
      const res = await request(app).post("/api/retrievefornotifications").send({
        "teacher":  "test_teacher@gmail.com",
        "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
      });
      expect(res.statusCode).to.equal(200);
      expect(res.body.recipients.length).to.be.gt(0);
    });
});