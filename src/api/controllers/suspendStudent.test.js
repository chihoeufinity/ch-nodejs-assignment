require('../../../node_modules/mysql2/node_modules/iconv-lite').encodingExists('foo');
import * as SuspendStudent from './suspendStudent.js';

beforeEach(() => {
    jest.restoreAllMocks();
});

describe("the suspendStudent function", () => {
it('Should call suspend student function', async () => {
    const mockRequest = () => {
        return {
          body: {
            student: "test_student_1@gmail.com"
          }
        };
      };
    const req = mockRequest();
    const spy = jest.fn(() => req);
    jest.spyOn(SuspendStudent, "default").mockImplementation(() => spy(req));
  
    await SuspendStudent.default(spy);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(req);
  });
})

describe("the suspendStudent function", () => {
    it('Should return email invalid error', async () => {
        jest.clearAllMocks();
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
      
        await SuspendStudent.default(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            "error": "Invalid email format",
            "message": "Failed to suspend"
        });
      });
})

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
        await SuspendStudent.default(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            "error": "Invalid Request",
            "message": "Failed to suspend"
        });
    });
});