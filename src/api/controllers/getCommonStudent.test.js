import * as getCommonStudents from './getCommonStudent.js';

beforeEach(() => {
    jest.restoreAllMocks();
});

describe("the getCommonStudent function", () => {
    it("return common students for single teacher", async () => {
        const mockRequest = () => {
            return {
              query: {
                teacher: "test_teacher_1@gmail.com"
              }
            };
          };
        const req = mockRequest();
        const spy = jest.fn(() => req);
        jest.spyOn(getCommonStudents, "default").mockImplementation(() => spy(req));
        await getCommonStudents.default(spy);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(req);
    });
});

describe("the getCommonStudent function", () => {
    it("return error when invalid email format", async () => {
        const mockRequest = () => {
            return {
              query: {
                teacher: "test@_teacher_1@gmail.com"
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
        await getCommonStudents.default(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            "error": "Invalid email format",
            "message": "Failed to get common students"
        });
    });
});

describe("the getCommonStudent function", () => {
    it("return error when invalid request parameter", async () => {
        const mockRequest = () => {
            return {
              query: {}
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
        await getCommonStudents.default(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            "error": "Invalid Request",
            "message": "Failed to get common students"
        });
    });
});