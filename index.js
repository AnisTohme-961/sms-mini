import dotenv from 'dotenv';
import express from 'express';
import DBCONNECT from './config/dbconnect.js';
import StudentRoutes from './routes/student.routes.js';
import StaffRoutes from './routes/staff.routes.js';
import ErrorHandler from './middleware/ErrorHandler.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
// INIT APP
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Welcome To My MINI-SMS API",
        author: "Anis Tohme",
        repository: "https://github.com/AnisTohme-961/sms-mini"
    })
})

app.use("/student", StudentRoutes);

app.use("/staff", StaffRoutes);

app.use(ErrorHandler);

// APP LISTENTING
app.listen(PORT, async () => {
    await DBCONNECT();
    console.log(`Server is running on port ${PORT}`);
})




