'use strict'
import { Router } from 'express';
// Import routes
import getCommonStudents from '../controllers/getCommonStudent.js';
import registerStudent from '../controllers/registerStudent.js';
import retrieveStudentForNoti from '../controllers/retrieveStudentForNoti.js';
import suspendStudent from '../controllers/suspendStudent.js';

const router = Router({
  caseSensitive: true
})

// Use imported routes in router
router.use('/api/register', registerStudent);
router.use('/api/commonstudents', getCommonStudents);
router.use('/api/suspend', suspendStudent);
router.use('/api/retrievefornotifications', retrieveStudentForNoti);

export default router;