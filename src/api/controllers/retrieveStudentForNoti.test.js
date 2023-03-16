import * as retrieveStudentForNoti from './retrieveStudentForNoti.js';

beforeEach(() => {
    jest.restoreAllMocks();
});

describe("the retrieveStudentForNoti function", () => {
    it("retrieve students for notication", async () => {
        const mockRequest = () => {
            return {
              body: {
                teacher:  "test_teacher_1@gmail.com",
                notification: "Hey everybody @test_student_2@gmail.com @test_student_3@gmail.com"
              }
            };
        };
        const req = mockRequest();
        const spy = jest.fn(() => req);
        jest.spyOn(retrieveStudentForNoti, "default").mockImplementation(() => spy(req));
        await retrieveStudentForNoti.default(spy);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(req);
    });
}),

describe("the retrieveStudentForNoti function", () => {
    it("return error when invalid email format", async () => {
        const mockRequest = () => {
            return {
                body: {
                    teacher:  "test_teacher_1@gmail.com",
                    notification: "Hey everybody @test@_student_2@gmail.com @test_student_3@gmail.com"
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
        await retrieveStudentForNoti.default(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            "error": "Invalid email format",
            "message": "Failed to retrieve students for notification"
        });
    });
});

describe("the retrieveStudentForNoti function", () => {
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
        await retrieveStudentForNoti.default(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            "error": "Invalid Request",
            "message": "Failed to retrieve students for notification"
        });
    });
});