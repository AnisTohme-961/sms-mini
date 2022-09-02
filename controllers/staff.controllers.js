import Staff from '../models/staff.js';
import bcrypt from 'bcryptjs';
import CreateError from '../util/CreateError.js';
import { generateStaffToken } from '../util/Token.js';

export const getStaff = async (req, res, next) => {
    try {
        const staffs = await Staff.find({});
        res.status(200).json({
            success: true,
            message: "Staffs fetched successfully",
            count: staffs.length,
            data: staffs
        });
    }
    catch (error) {
        next (error)
    }
}

export const createStaff = async (req, res, next) => {
    const { name, username, email, pin, role } = req.body;
    const hashedPin = await bcrypt.hash(pin, 12);
    try {
        const staff = new Staff ({
            name: name,
            username: username, 
            email: email, 
            pin: hashedPin,
            role: role 
        });
        await staff.save();
        res.status(201).json({
            success: true,
            message: "Staff created successfully",
            staff: staff
        })
    }
    catch (error) {
        next (error)
    }
}

export const deleteStaff = async (req, res, next) => {
    const id = req.params.id;
    try {
        const staff = await Staff.findById(id);
        if (!staff) {
            return next(CreateError(`Staff not found with email ${id}`, 404))
        }
        const deletedData = await Staff.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Staff deleted successfully",
            data: deletedData
        })
    }
    catch (error) {
        next (error)
    }
}

export const loginStaff = async (req, res, next) => {
    const {email, pin} = req.body;
    try {
        const staff = await Staff.findOne({email});
        if (!staff) {
            return next(CreateError(`Staff not found with email ${email}`, 404))
        }
        const isMatch = bcrypt.compareSync(pin, staff.pin);
        if (!isMatch) {
            return next(CreateError(`Password is incorrect`, 401))
        }
        const {accessToken, refreshToken } = generateStaffToken(staff); 

        await Staff.findOneAndUpdate({email}, {token: refreshToken});  // update staff wih refresh token in the database

        const {token, ...staffData} = staff._doc;   // remove the refresh token in response using _doc

        staffData.accessToken = accessToken;    // add accesstoken to response

        res.status(200).json({
            success: true, 
            message: "Login Successful",
            staff: staffData
        })
    }
    catch (error){
        next(error)
    }
}

export const changePassword = async (req, res, next) => {
    const email = req.params.email;
    const { currentPin, newPin } = req.body; 
    const hashedPin = await bcrypt.hash(newPin, 12);

    try {
        const staff = await Staff.findOne({email});
        if (!staff) {
            return next(CreateError(`Staff not found with email ${email}`, 404))
        }
        const isMatch = bcrypt.compareSync(currentPin, staff.pin);
        if (!isMatch) {
            return next(CreateError("Password is incorrect", 401))
        }
        const updatedStaff = await Staff.findOneAndUpdate({email}, {pin: hashedPin}, {new: true});
        if (!updatedStaff) {
            return next(CreateError(`Staff not found with email ${email}`, 404))
        }
        res.status(200).json({
            success: true,
            message: "Staff password updated successfully",
            staff: updatedStaff
        })
    }

    catch (error) {
        next (error)
    }
}

export const updateStaffInfo = async (req, res, next) => {
    const id = req.params.id;
    const { name, username, email, role } = req.body;
    try {
        const staff = Staff.findByIdAndUpdate(id, {name, username, email, role}, {new: true});
        if (!staff) {
            return next(CreateError(`Staff not found with id ${id}`, 404))
        }
        res.status(200).json({
            success: true,
            message: "Staff information updated successfully",
            staff: staff
        })
    }
    catch (error) {
        next (error)
    }
}

export const changeSelfPassword = async (req, res, next) => {
    const id = req.user.id;
    try {
        const updatedStaff = await Staff.findByIdAndUpdate(id, {pin: req.body.pin}, {new: true});
        if (!updatedStaff) {
            return next(CreateError("Staff not found", 404));
        }
        res.status(201).json({
            succces: true,
            message: "Password changed successfully",
            staff: updatedStaff
        })
    }
    catch (error) {
        next (error)
    }
}


