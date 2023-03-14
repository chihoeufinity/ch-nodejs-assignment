'use strict'

import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import studentService from './../services/studentServices.js';
import { emailValidation } from '../utils/index.js';
const router = Router();


const retrieveStudentForNoti = async function (req, res, next) {
    try {
        // Call studentService to response with data
        if (!req.body?.teacher || !req.body?.notification) {
            res.status(StatusCodes.BAD_REQUEST).send({
                message: "Failed to retrieve students for notification",
                error: "Invalid Request"
            });
        }

        let emailArr = [];
        let regex = /@(\S+)(?!\w)/g;
        let temp = req.body.notification.match(regex);
        temp?.forEach(e => {
            emailArr.push(e.substring(1)) // remove leading @
        })

        if (!emailValidation(req.body.teacher) || (emailArr.length && !emailValidation(emailArr))) {
            res.status(StatusCodes.BAD_REQUEST).send({
                message: "Failed to retrieve students for notification",
                error: "Invalid email format"
            });
            return;
        }

        let result = await studentService.retrieveStudentForNoti(req.body.teacher, emailArr);
        res.status(StatusCodes.OK).send({status: "success", recipients: result});
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send({message: "Failed to retrieve students for notification", error: err});
    }
}

export default retrieveStudentForNoti;