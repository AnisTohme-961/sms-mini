import mongoose from "mongoose";

const staffSchema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Staff name is required']
    },
    username: {
        type: String,
        required: [true, 'Staff username is required'],
        unique: true
    },
    email: {
        type: String, 
        required: [true, 'Staff email is required'],
        unique: true
    },
    pin: {
        type: String,
        required: [true, 'Staff password is required'],
    },
    role: {
        type: String,
        enum: ["admin", "staff", "teacher"],
        default: "staff" 
    },
    token: {
        type: String,
        default: null
    }
}, {timestamps: true})

export default mongoose.model('Staff', staffSchema)