import express from 'express' ;

import { getStudents, addStudent, getStudentById, getStudentByEmail, updateStudent } from '../controllers/student.controllers.js';

const router = express.Router();

router.get('/', getStudents);

router.post('/', addStudent);

router.get('/id/:id', getStudentById);

router.get('/email/:email', getStudentByEmail);

router.put('/id/:id', updateStudent)

export default router;



