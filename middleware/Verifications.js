import CreateError from "../util/CreateError.js";
import jwt from "jsonwebtoken";
import Staff from "../models/staff.js";

export const verifyLogin = async (req, res, next) => {
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

        /*const { id, role } = decodedToken;
        const staff = await Staff.findOne({id});
        if (!staff) {
            return next(CreateError(`Staff not found with id ${id}`, 404))
        }*/
        req.user = decodedToken;
        next();
    }
    catch (error) {
        next (error)
    }
    if (!token) {
        return next(CreateError("Token not found", 401))
    }
}

export const verifyAdmin = async (req, res, next) => {
    const { role } = req.staff;
    if (role != "admin") {
        return next(CreateError("Not authorized", 403));
    }
    next();
}

export const verifyStaff = async (req, res, next) => {
    const { role } = req.staff;
    if (!role) {
        return next(CreateError("Not authorized", 403));
    }
    next();
}