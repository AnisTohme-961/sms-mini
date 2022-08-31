import CreateError from "../util/CreateError.js";
import jwt from "jsonwebtoken";
import Staff from "../models/staff.js";
import Student from "../models/student.js";

export const verifyStudentLogin = async (req, res, next) => {
    let token = null;
    try {
        console.log("headers", req.headers.authorization)
        const headers = req.headers.authorization;
        if (headers == undefined) {
            return next(CreateError("Token not found", 401))
        }
        token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token: ", decodedToken);
        if (!decodedToken) {
            return next(CreateError("Token not found", 401))
        }
        if (decodedToken.exp < Date.now() / 1000) {
            return next(CreateError("Token expired"), 401)
        }

        const { id, email } = decodedToken;
        const student = await Student.findOne({id});
        if (!student) {
            return next(CreateError(`Student not found with id ${id}`, 404))
        }
        req.student = student;
        next();
    }
    catch (error) {
        next (error)
    }

    if (!token) {
        return next(CreateError("Token not found", 404))
    }
}

export const verifyStaffLogin = async (req, res, next) => {
    let token = null;
    try {
        console.log("headers", req.headers.authorization);
        const headers = req.headers.authorization;
        if (headers == undefined) {
            return next(CreateError("Token not found", 401))
        }
        token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token: ", decodedToken);
        if (!decodedToken) {
            return next(CreateError("Invalid Token", 401))
        }
        if (decodedToken.exp < Date.now() / 1000) {
            return next(CreateError("Token expired", 401))
        }

        const { id, role } = decodedToken;
        const staff = await Staff.findOne({id});
        if (!staff) {
            return next(CreateError(`Staff not found with id ${id}`, 404))
        }
        req.staff = staff;
        next();
    }
    catch (error) {
        next (error)
    }
    if (!token) {
        return next(CreateError("Token not found", 404))
    }
}