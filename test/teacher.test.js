import request from 'supertest';
import chai from 'chai';
import app from '../app.js';
import { after } from 'mocha';
import db from '../src/api/models/index.js';
const expect = chai.expect;

after(async function() {
  await db.teacher.destroy(
    { where: { email: ["test_teacher_register@gmail.com"]} }
  )
});

describe("POST /api/registerTeacher", () => {
    it("should register teacher", async () => {
      const res = await request(app).post("/api/registerTeacher").send({
        "teacher": "test_teacher_register@gmail.com"
      });
      expect(res.statusCode).to.equal(204);
    });
});

describe("POST /api/registerTeacher", () => {
    it("should failed register teacher as email is in wrong format", async () => {
      const res = await request(app).post("/api/registerTeacher").send({
        "teacher": "test_teacher@_register@gmail.com"
      });
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("Invalid email format");
    });
});