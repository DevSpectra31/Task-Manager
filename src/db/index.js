import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const uri=process.env.MONGO_URI;
    console.log("Database uri : ",uri)
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI,{
      dbName:"Task_Manager",
    });
    console.log(`✅ MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("❌ MONGODB connection FAILED: ", error.message);
    process.exit(1);
  }
};

export { connectDB };
