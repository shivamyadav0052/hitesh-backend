import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionString = process.env.MONGODB_URI || process.env.MONGODB_URL;

        if (!connectionString) {
            console.error("MongoDB connection string is missing. Set MONGODB_URI or MONGODB_URL in .env");
            process.exit(1);
        }

        const connectionInstance = await mongoose.connect(connectionString);
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
