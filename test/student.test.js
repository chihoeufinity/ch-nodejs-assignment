import request from 'supertest';
import chai from 'chai';
import app from '../app.js';
import { before, after } from 'mocha';
import db from '../src/api/models/index.js';
const expect = chai.expect;

before(async function() {
  await db.teacher.create({
    email: "test_teacher@gmail.com"
  });
});

after(async function() {
  await db.student.destroy(
    { where: { email: ["test_student_1@gmail.com", "test_student_2@gmail.com"]} }
  )

  await db.teacher.destroy(
    { where: { email: ["test_teacher@gmail.com"]} }
  )
});

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
      expect(res.statusCode).to.equal(204);
    });
});

describe("POST /api/register", () => {
  it("should failed to register student as teacher don't exists", async () => {
    const res = await request(app).post("/api/register").send({
      "teacher": "test_teacher_0@gmail.com",
      "students":
      [
          "test_student_1@gmail.com",
          "test_student_2@gmail.com",
      ]
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.error).to.equal("teacher does not exists");
  });
});

describe("POST /api/register", () => {
  it("should failed to register as email is in wrong format", async () => {
    const res = await request(app).post("/api/register").send({
      "teacher": "test_teacher@gmail.com",
      "students":
      [
          "test@_student_1@gmail.com",
          "test@_student_2@gmail.com",
      ]
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.error).to.equal("Invalid email format");
  });
});

describe("GET /api/commonstudents", () => {
    it("should return common students", async () => {
      const res = await request(app).get("/api/commonstudents?teacher=test_teacher%40gmail.com");
      expect(res.statusCode).to.equal(200);
      expect(res.body.students.length).to.be.gt(0);
    });
});


describe("GET /api/commonstudents", () => {
  it("should failed to return common students as invalid parameter", async () => {
    const res = await request(app).get("/api/commonstudents");
    expect(res.statusCode).to.equal(400);
    expect(res.body.error).to.equal("Invalid Request");
  });
});

describe("GET /api/commonstudents", () => {
  it("should failed to return common students as email is in wrong format", async () => {
    const res = await request(app).get("/api/commonstudents?teacher=test@_teacher%40gmail.com");
    expect(res.statusCode).to.equal(400);
    expect(res.body.error).to.equal("Invalid email format");
  });
});

describe("POST /api/suspend", () => {
    it("should suspend student", async () => {
      const res = await request(app).post("/api/suspend").send({
          "student" : "test_student_1@gmail.com"
      });
      expect(res.statusCode).to.equal(204);
    });
});

describe("POST /api/commonstudents", () => {
  it("should failed to suspend student as parameter is invalid", async () => {
    const res = await request(app).post("/api/suspend").send({
        "student" : ""
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.error).to.equal("Invalid Request");
  });
});

describe("POST /api/commonstudents", () => {
  it("should failed to suspend student as email is in wrong format", async () => {
    const res = await request(app).post("/api/suspend").send({
        "student" : "test@_student_1@gmail.com"
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.error).to.equal("Invalid email format");
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

describe("POST /api/retrievefornotifications", () => {
  it("sshould failed to retrieve list of students for notification as parameter is invalid", async () => {
    const res = await request(app).post("/api/retrievefornotifications").send({
      "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.error).to.equal("Invalid Request");
  });
});

describe("POST /api/retrievefornotifications", () => {
  it("sshould failed to retrieve list of students for notification as email is in wrong format", async () => {
    const res = await request(app).post("/api/retrievefornotifications").send({
      "teacher":  "test_teacher@gmail.com",
      "notification": "Hello students! @studentag@nes@gmail.com @studentmiche@gmail.com"
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.error).to.equal("Invalid email format");
  });
});