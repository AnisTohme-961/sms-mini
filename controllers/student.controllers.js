import Student from '../models/student.js';
import bcrypt from 'bcryptjs';
import CreateError from '../util/CreateError.js';

export const getStudents = async (req, res, next) => {

    try {
        const students = await Student.find({});
        if (students.length <= 0) {     // Check if students are found
            return next(CreateError("No students found", 404))
        }
        res.status(200).json({
            success: true,
            message: " Here we get all the students",
            students: students,
            totalStudents: students.length
    })
  }
    catch (error) {
        next(error)
    }
}

export const addStudent = async (req, res, next) => {

    const { id, firstName, lastName, email, age, pin } = req.body;
    const hashedPin = await bcrypt.hash(pin, 12);
    try {
    const student = new Student({
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        pin: hashedPin  
    })
    await student.save();
    res.status(201).json({
        success: true, 
        message: "Student created successfully",
        student: student
    })
  }
    catch (error) {
        next(error)
    }
}

export const getStudentById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const student = await Student.findOne({id});
        if (!student) {
            return next(CreateError(`Student Not Found with id ${id}`, 404))
        }
        res.status(200).json({
            success: true,
            student: student
        })

    }
    catch (error) {
        next(error)
    }
}

export const getStudentByEmail = async (req, res, next) => {
    const email = req.params.email;
    try {
        const student = await Student.findOne({email});
        if (!student){
            return next(CreateError(`Email not found of email ${email}`, 404))
        }
        res.status(200).json({
            success: true,
            student: student
        })
    }
    catch(error) {
        next(error)
    }
}

export const updateStudent = async (req, res, next) => {
    const id = req.params.id;
    const {firstName, lastName, email, age} = req.body;
    try {
        const student = await Student.findOneAndUpdate({id}, {firstName, lastName, email, age}, {new:true});
        if (!student) {
            return next(CreateError(`Student not found with id ${id}`))
        }
        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            student: student
        })
    }
    catch (error) {
        next (error)
    }
}

export const changePassword = async (req, res, next) => {
    const id = req.params.id;
    const { currentPin, newPin } = req.body;
    const hashedPin = await bcrypt.hash(newPin, 12);
    try {
        const student = await Student.findOne({id});
        if (!student) {
            return next(CreateError(`Student not found with id ${id}`, 404))
        }
        const isMatch = bcrypt.compareSync(currentPin, student.pin);
        if (!isMatch) {
            return next(CreateError('Password is incorrect', 401))
        }
        const updatedStudent = await Student.findOneAndUpdate({id}, {pin: hashedPin}, {new: true});
        if (!updatedStudent) {
            return next(CreateError(`Student not found with id ${id}`, 404))
        }
        res.status(200).json ({
            success: true,
            message: "Student password updated successfully",
            student: updatedStudent
        })
    }
    catch (error) {
        next (error);
    }
}

export const deleteStudent = async (req, res, next) => {
    const id = req.params.id;
    try {
        const student = await Student.findOneAndDelete({id});
        if (!student) {
            return next(CreateError(`Student not found with id ${id}`, 404))
        }
        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            student: student
        })
    }
    catch (error) {
        next (error);
    }
}
