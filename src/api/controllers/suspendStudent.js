'use strict'

import { StatusCodes } from 'http-status-codes';
import studentService from './../services/studentServices.js';
import { emailValidation } from '../utils/index.js';

const suspendStudent = async function (req, res, next) {
    try {
        if (!req.body?.student) {
            res.status(StatusCodes.BAD_REQUEST).send({
                message: "Failed to suspend",
                error: "Invalid Request"
            });
            return;
        }

        if (!emailValidation(req.body.student)) {
            res.status(StatusCodes.BAD_REQUEST).send({
                message: "Failed to suspend",
                error: "Invalid email format"
            });
            return;
        }
        // Call studentService to response with data
        let result = await studentService.suspendStudent(req.body.student);
        res.status(StatusCodes.NO_CONTENT).send({});
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send({
            message: "Failed to suspend", 
            error: err.message || "Failed to update data for this request"
        });
        return;
    }
}

export default suspendStudent;