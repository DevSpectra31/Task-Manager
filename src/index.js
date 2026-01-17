import dotenv from "dotenv";
const dot=dotenv.config({path:'./.env'});
import app from "./app.js";
import { connectDB } from "./db/index.js";
connectDB();
const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Application is running on Port ${port}`)
});