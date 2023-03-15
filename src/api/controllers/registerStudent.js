'use strict'

import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import studentService from './../services/studentServices.js';
import { emailValidation } from '../utils/index.js';
const router = Router();

const registerStudent = async function (req, res, next) {
    try {
        if (!req.body?.teacher || !req.body?.students?.length) {
            res.status(StatusCodes.BAD_REQUEST).send({
                message: "Failed to register",
                error: "Invalid Request"
            });
        }
        if (!emailValidation(req.body.teacher) || !emailValidation(req.body.students)) {
            res.status(StatusCodes.BAD_REQUEST).send({
                message: "Failed to register",
                error: "Invalid email format"
            });
            return;
        }

        // Call service to response with data
        let result = await studentService.registerStudents(req.body.teacher, req.body.students);
        res.status(StatusCodes.NO_CONTENT).send({status: "success", message: result});
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send({
            message: "Failed to register", 
            error: "Failed to insert data for this request"
        });
    }
}

export default registerStudent;