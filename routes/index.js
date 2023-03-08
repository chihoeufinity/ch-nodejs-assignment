'use strict'
import { Router } from 'express';
// Import routes
import student from './student/students.js';

const router = Router({
  caseSensitive: true
})

// Use imported routes in router
router.use('/api', student);

export default router;