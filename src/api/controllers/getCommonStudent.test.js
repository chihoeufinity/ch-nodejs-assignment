require('../../../node_modules/mysql2/node_modules/iconv-lite').encodingExists('foo');
import getCommonStudents from './getCommonStudent.js';
import db from '../models/index.js';

const studentData = [
    {
        email: "test_student_1@gmail.com"
    },
    {
        email: "test_student_2@gmail.com"
    },
    {
        email: "test_student_3@gmail.com"
    }
]

const teacherData = [
    {
        email: "test_teacher_1@gmail.com"
    },
    {
        email: "test_teacher_2@gmail.com"
    }
]

let teacherId = [];
let studentId = [];

beforeAll(async () => {
    const teacherRes = await db.teacher.bulkCreate(teacherData);
    const studentRes = await db.student.bulkCreate(studentData);
    teacherId = teacherRes.map(s => s.id);
    studentId = studentRes.map(s => s.id);
    const teacherStudentObj = [
        {
            teacher_id: teacherId[0], student_id: studentId[0] 
        },
        {
            teacher_id: teacherId[0], student_id: studentId[1] 
        },
        {
            teacher_id: teacherId[0], student_id: studentId[2] 
        },
        {
            teacher_id: teacherId[1], student_id: studentId[0] 
        }
    ]

    await db.teacher_student.bulkCreate(teacherStudentObj);
});

afterAll(async () => {
    await db.teacher.destroy(
        { where: { email: ["test_teacher_1@gmail.com", "test_teacher_2@gmail.com"]} }
    );
    await db.student.destroy(
        { where: { email: ["test_student_1@gmail.com", "test_student_2@gmail.com", "test_student_3@gmail.com"]} }
    );
    await db.teacher_student.destroy(
        { where: { teacher_id: teacherId} }
    );
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
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.send = jest.fn().mockReturnValue(res);
            return res;
        };
        const req = mockRequest();
        const res = mockResponse();
        await getCommonStudents(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            "status": "success", 
            "students": ["test_student_1@gmail.com", "test_student_2@gmail.com", "test_student_3@gmail.com"]
        });
    });
});

describe("the getCommonStudent function", () => {
    it("return common students for multiple teacher", async () => {
        const mockRequest = () => {
            return {
              query: {
                teacher: ["test_teacher_1@gmail.com", "test_teacher_2@gmail.com"]
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
        await getCommonStudents(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            "status": "success", 
            "students": ["test_student_1@gmail.com", "test_student_2@gmail.com", "test_student_3@gmail.com"]
        });
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
        await getCommonStudents(req, res);
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
        await getCommonStudents(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            "error": "Invalid Request",
            "message": "Failed to get common students"
        });
    });
});