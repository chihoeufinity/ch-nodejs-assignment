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

router.post('/api/register', (req, res) => {
  registerStudent(req, res);
})

router.get('/api/commonstudents', (req, res) => {
  getCommonStudents(req, res);
})

router.post('/api/suspend', (req, res) => {
  suspendStudent(req, res);
})

router.post('/api/retrievefornotifications', (req, res) => {
  retrieveStudentForNoti(req, res);
})

export default router;