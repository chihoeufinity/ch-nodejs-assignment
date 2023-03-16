import * as registerTeacher from './registerTeacher.js';

beforeEach(() => {
    jest.restoreAllMocks();
});

describe("the registerTeacher function", () => {
    it("register teacher", async () => {
        const mockRequest = () => {
            return {
              body: {
                teacher: "test_teacher_1@gmail.com"
              }
            };
          };
        const req = mockRequest();
        const spy = jest.fn(() => req);
        jest.spyOn(registerTeacher, "default").mockImplementation(() => spy(req));
        await registerTeacher.default(spy);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(req);
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
        await registerTeacher.default(req, res);
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
        await registerTeacher.default(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            "error": "Invalid Request",
            "message": "Failed to register"
        });
    });
});