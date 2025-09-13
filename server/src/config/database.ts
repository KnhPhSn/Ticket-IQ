import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI!);
        console.log("Database connected successfully");
    } catch(err) {
        console.error("Database connection failed");
        console.error(err);
    }
}

export default connectDB;