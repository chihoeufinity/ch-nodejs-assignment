require('../../../node_modules/mysql2/node_modules/iconv-lite').encodingExists('foo');
import registerTeacher from './registerTeacher.js';
import db from '../models/index.js';

afterAll(async () => {
    await db.teacher.destroy(
        { where: { email: "test_teacher_1@gmail.com"} }
    );
});

describe("the registerTeacher function", () => {
    it("register single teacher", async () => {
        const mockRequest = () => {
            return {
              body: {
                teacher: "test_teacher_1@gmail.com"
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
        await registerTeacher(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalledWith({
            "status": "success",
            "message": {
                "teacher": "test_teacher_1@gmail.com",
            },
        });
    });
});

describe("the registerTeacher function", () => {
    it("return error when invalid email format", async () => {
        const mockRequest = () => {
            return {
              body: {
                teacher: "test_@teacher_1@gmail.com"
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
        await registerTeacher(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            "error": "Invalid email format",
            "message": "Failed to register"
        });
    });
});

describe("the registerTeacher function", () => {
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
        await registerTeacher(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            "error": "Invalid Request",
            "message": "Failed to register"
        });
    });
});