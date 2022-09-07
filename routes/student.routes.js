import express from 'express' ;
import { verifyLogin, verifyStaff, verifyAdmin } from '../middleware/Verifications.js';

import { getStudents, addStudent, getStudentById, getStudentByEmail, updateStudent, changePassword, deleteStudent, login } from '../controllers/student.controllers.js';

const router = express.Router();

// @route   GET /student/
// @desc    Get All Logged In Students
// @access  Public

router.get('/', verifyLogin, verifyStaff, getStudents); 

// @route   POST /student/
// @desc    Add New Student
// @access  Public

router.post('/', verifyLogin, verifyAdmin, addStudent);   

// @route   GET /student/id
// @desc    GET Student
// @access  Public

router.get('/id', verifyLogin, getStudentById); 

// @route   GET /student/email
// @desc    GET Email
// @access  Public

router.get('/email', verifyLogin, getStudentByEmail);

// @route   PUT /student/:id
// @desc    Update Student 
// @access  Public

router.put('/:id', verifyLogin, verifyStaff, updateStudent);

// @route   PUT /student/changePassword/:id
// @desc    Change Student Password
// @access  Private

router.put('/changePassword/:id', verifyLogin, verifyStaff, changePassword);

// @route   DELETE /student/:id
// @desc    Delete Student
// @access  Private

router.delete('/:id', verifyLogin, verifyAdmin, deleteStudent);

// @route   POST /student/login
// @desc    Student Login
// @access  Private

router.post('/login', login);

export default router;



