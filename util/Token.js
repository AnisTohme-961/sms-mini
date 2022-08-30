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