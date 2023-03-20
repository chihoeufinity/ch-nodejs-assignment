'use strict'
import { Router } from 'express';
// Import routes
import registerTeacher from '../controllers/registerTeacher.js';

const router = Router({
  caseSensitive: true
})

router.post('/api/registerTeacher', (req, res) => {
    registerTeacher(req, res);
})

export default router;