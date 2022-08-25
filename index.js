import dotenv from 'dotenv';
import express from 'express';
import DBCONNECT from './config/dbconnect.js';
import StudentRoutes from './routes/student.routes.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
// INIT APP
const app = express();

app.use(express.json());

app.use("/student", StudentRoutes);

// APP LISTENTING
app.listen(PORT, async () => {
    await DBCONNECT();
    console.log(`Server is running on port ${PORT}`);
})




