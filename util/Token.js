import jwt from 'jsonwebtoken';

export const generateStudentToken = (student) => {
    const { id, email } = student;
    const accessToken = jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
    });
    const refreshToken = jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
    })

    return { accessToken, refreshToken }
}

export const generateStaffToken = (staff) => {
    const { _id, role } = staff;
    const accessToken = jwt.sign({id: _id, role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
    });
    const refreshToken = jwt.sign({id: _id, role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
    });

    return { accessToken, refreshToken }
}