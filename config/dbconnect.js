import mongoose from 'mongoose';

const DBCONNECT = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URL || 3000)
    } catch (error) {
        console.log(error);
    }
}

export default DBCONNECT;