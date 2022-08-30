import express from 'express' ;

import { getStudents, addStudent, getStudentById, getStudentByEmail, updateStudent, changePassword, deleteStudent } from '../controllers/student.controllers.js';

const router = express.Router();

router.get('/', getStudents); 

router.post('/', addStudent);   

router.get('/id/:id', getStudentById); 

router.get('/email/:email', getStudentByEmail);

router.put('/:id', updateStudent);

router.put('/changePassword/:id', changePassword);

router.delete('/:id', deleteStudent);

export default router;



