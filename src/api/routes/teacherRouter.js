'use strict'
import { Router } from 'express';
// Import routes
import registerTeacher from '../controllers/registerTeacher.js';

const router = Router({
  caseSensitive: true
})

// Use imported routes in router
router.use('/api/registerTeacher', registerTeacher);

export default router;