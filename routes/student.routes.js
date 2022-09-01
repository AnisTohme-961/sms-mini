import express from 'express' ;
import { verifyLogin, verifyStaff, verifyAdmin } from '../middleware/Verifications.js';

import { getStudents, addStudent, getStudentById, getStudentByEmail, updateStudent, changePassword, deleteStudent, login } from '../controllers/student.controllers.js';

const router = express.Router();

router.get('/', verifyLogin, verifyAdmin, getStudents); 

router.post('/', verifyLogin, verifyAdmin, addStudent);   

router.get('/id/:id', verifyLogin, getStudentById); 

router.get('/email/:email', verifyLogin, getStudentByEmail);

router.put('/:id', verifyLogin, verifyStaff, updateStudent);

router.put('/changePassword/:id', verifyLogin, changePassword);

router.delete('/:id', verifyLogin, verifyAdmin, deleteStudent);

router.post('/login', login);

export default router;



