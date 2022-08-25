import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Student Id is required'],
        unique: true
    },
    firstName: {
        type: String,
        required: [true, 'First Name is required']
    },
    lastName: {
        type: String, 
        required: [true, 'Last Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    pin: {
        type: String,
        required: [true, 'Pin is required']
    },
}, {timestamps: true})

export default mongoose.model('Student', studentSchema);