'use strict'

import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import studentService from './../services/studentServices.js';
import { emailValidation } from '../utils/index.js';
const router = Router();

const getCommonStudents = async function (req, res, next) {
    try {
        if (!req.query?.teacher) {
            res.status(StatusCodes.BAD_REQUEST).send({
                message: "Failed to get common students",
                error: "Invalid Request"
            });
            return;
        } 

        if (!emailValidation(req.query.teacher)) {
            res.status(StatusCodes.BAD_REQUEST).send({
                message: "Failed to get common students",
                error: "Invalid email format"
            });
            return;
        }

        // Call studentService to response with data
        let teacherEmails = Array.isArray(req.query.teacher) ? req.query.teacher : [req.query.teacher];
        let result = await studentService.getCommonStudents(teacherEmails);
        res.status(StatusCodes.OK).send({students: result});
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send({
            message: "Failed to get common students", 
            error: err.message || "Failed to retrieve data for this request"
        });
        return;
    }
}

export default getCommonStudents;