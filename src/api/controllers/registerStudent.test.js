require('../../../node_modules/mysql2/node_modules/iconv-lite').encodingExists('foo');
import registerStudent from './registerStudent.js';
import db from '../models/index.js';

beforeAll(async () => {
    await db.teacher.create({email: "test_teacher_1@gmail.com"});
});

afterAll(async () => {
    await db.student.destroy(
        { where: { email: "test_student_1@gmail.com"} }
    );
    await db.teacher.destroy(
        { where: { email: "test_teacher_1@gmail.com"} }
    );
});

describe("the registerStudent function", () => {
    it("register students", async () => {
        const mockRequest = () => {
            return {
              body: {
                teacher: "test_teacher_1@gmail.com",
                students: ["test_student_1@gmail.com"]
              }
            };
          };
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.send = jest.fn().mockReturnValue(res);
            return res;
        };
        const req = mockRequest();
        const res = mockResponse();
        await registerStudent(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalledWith({
            "status": "success",
            "message": {
                "students": ["test_student_1@gmail.com"],
                "teacher": "test_teacher_1@gmail.com",
            },
        });
    });
});

describe("the registerStudent function", () => {
    it("return error when invalid email format", async () => {
        const mockRequest = () => {
            return {
              body: {
                student: "test@_student_1@gmail.com"
              }
            };
          };
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.send = jest.fn().mockReturnValue(res);
            return res;
        };
        const req = mockRequest();
        const res = mockResponse();
        await registerStudent(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            "error": "Invalid email format",
            "message": "Failed to register"
        });
    });
});

describe("the registerStudent function", () => {
    it("return error when invalid request parameter", async () => {
        const mockRequest = () => {
            return {
              body: {}
            };
          };
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.send = jest.fn().mockReturnValue(res);
            return res;
        };
        const req = mockRequest();
        const res = mockResponse();
        await registerStudent(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            "error": "Invalid Request",
            "message": "Failed to register"
        });
    });
});