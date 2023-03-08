'use strict'

import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import handler from './studentsHandler.js';
const router = Router();

router.post(
    '/register',
     async (req, res, next) => {
        try {
            // Call handler to response with data
            if (req.body?.teacher && req.body?.students?.length) {
                let result = await handler.registerStudents(req.body.teacher, req.body.students);
                res.status(StatusCodes.OK).send({status: "success", message: result});
            } else {
                res.status(StatusCodes.BAD_REQUEST).send({
                    message: "Failed to register",
                    error: "Invalid Request"
                });
            }
        } catch (err) {
            res.status(StatusCodes.BAD_REQUEST).send({message: "Failed to register", error: err});
        }
    }
)

router.get(
    '/commonstudents',
     async (req, res, next) => {
        try {
            // Call handler to response with data
            if (req.query?.teacher) {
                let result = await handler.getCommonStudents(req.query.teacher);
                res.status(StatusCodes.OK).send({status: "success", students: result});
            } else {
                res.status(StatusCodes.BAD_REQUEST).send({
                    message: "Failed to get common students",
                    error: "Invalid Request"
                });
            }
        } catch (err) {
            res.status(StatusCodes.BAD_REQUEST).send({message: "Failed to get common students", error: err});
        }
    }
)

router.post(
    '/suspend',
     async (req, res, next) => {
        try {
            // Call handler to response with data
            if (req.body?.student) {
                let result = await handler.suspendStudent(req.body.student);
                res.status(StatusCodes.OK).send({status: "success", message: result});
            } else {
                res.status(StatusCodes.BAD_REQUEST).send({
                    message: "Failed to suspend",
                    error: "Invalid Request"
                });
            }
        } catch (err) {
            res.status(StatusCodes.BAD_REQUEST).send({message: "Failed to suspend", error: err});
        }
    }
)

router.post(
    '/retrievefornotifications',
     async (req, res, next) => {
        try {
            // Call handler to response with data
            if (req.body?.teacher && req.body?.notification) {
                let result = await handler.retrieveStudentForNoti(req.body.teacher, req.body.notification);
                res.status(StatusCodes.OK).send({status: "success", recipients: result});
            } else {
                res.status(StatusCodes.BAD_REQUEST).send({
                    message: "Failed to retrieve notifications",
                    error: "Invalid Request"
                });
            }
        } catch (err) {
            res.status(StatusCodes.BAD_REQUEST).send({message: "Failed to retrieve notifications", error: err});
        }
    }
)

export default router;