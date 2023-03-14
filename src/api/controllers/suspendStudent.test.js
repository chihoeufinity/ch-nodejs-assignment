require('../../../node_modules/mysql2/node_modules/iconv-lite').encodingExists('foo');
import suspendStudent from './suspendStudent.js';
import db from '../models/index.js';

beforeAll(async () => {
    await db.student.create({email: "test_student_1@gmail.com"});
});

afterAll(async () => {
    await db.student.destroy(
        { where: { email: "test_student_1@gmail.com"} }
    );
});

describe("the suspendStudent function", () => {
    it("suspend students", async () => {
        const mockRequest = () => {
            return {
              body: {
                student: "test_student_1@gmail.com"
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
        await suspendStudent(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
    });
});

describe("the suspendStudent function", () => {
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
        await suspendStudent(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            "error": "Invalid email format",
            "message": "Failed to suspend"
        });
    });
});

describe("the suspendStudent function", () => {
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
        await suspendStudent(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            "error": "Invalid Request",
            "message": "Failed to suspend"
        });
    });
});