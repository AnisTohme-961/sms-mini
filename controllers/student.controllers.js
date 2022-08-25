import Student from '../models/student.js';
import bcrypt from 'bcryptjs';

export const getStudents = ( async (req, res, next) => {

    try {
        const students = await Student.find({});
        const totalStudents = await Student.find({}).countDocuments();
        res.status(200).json({
            success: true,
            message: " Here we get all the students",
            students: students,
            totalStudents: totalStudents
    })
  }
    catch (error) {
        next(error)
    }
})

export const addStudent = (async (req, res, next) => {

    const { id, firstName, lastName, email, age, pin } = req.body;
    const hashedPin = await bcrypt.hash(pin, 12);
    try {
    const student = await new Student({
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        pin: hashedPin  
    })
    student.save();
    res.status(201).json({
        success: true, 
        message: "Student created successfully",
        student: student
    })
  }
    catch (error) {
        next(error)
    }
})
