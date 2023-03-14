'use strict'

import { StatusCodes } from 'http-status-codes';
import teacherService from './../services/teacherServices.js';
import { emailValidation } from '../utils/index.js';

const registerTeacher = async function (req, res, next) {
    try {
        // Call service to response with data
        if (!req.body?.teacher) {
            res.status(StatusCodes.BAD_REQUEST).send({
                message: "Failed to register",
                error: "Invalid Request"
            });
            return;
        }

        if (!emailValidation(req.body.teacher)) {
            res.status(StatusCodes.BAD_REQUEST).send({
                message: "Failed to register",
                error: "Invalid email format"
            });
            return;
        }

        // Call service to response with data
        let result = await teacherService.registerTeacher(req.body.teacher);
        res.status(StatusCodes.NO_CONTENT).send({status: "success", message: result});
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send({
            message: "Failed to register", 
            error: err.errors?.map(e => e.message) || err.message
        });
    }
}

export default registerTeacher;