import express from 'express' ;
import { verifyStudentLogin } from '../middleware/Verifications.js';

import { getStudents, addStudent, getStudentById, getStudentByEmail, updateStudent, changePassword, deleteStudent, login } from '../controllers/student.controllers.js';

const router = express.Router();

router.get('/', getStudents); 

router.post('/', addStudent);   

router.get('/id/:id', getStudentById); 

router.get('/email/:email', getStudentByEmail);

router.put('/:id', verifyStudentLogin, updateStudent);

router.put('/changePassword/:id', verifyStudentLogin, changePassword);

router.delete('/:id', deleteStudent);

router.post('/login', login);

export default router;



