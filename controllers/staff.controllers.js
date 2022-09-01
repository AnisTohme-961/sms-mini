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
        const staff = await Staff.findOne({id});
        if (!staff) {
            return next(CreateError(`Staff not found with id ${id}`, 404))
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
            return next(CreateError(`Staff not found with id ${email}`, 404))
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

