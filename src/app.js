import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
//middlewares
app.use(express.json());
app.use(express.urlencoded());
//import routes
import RegisterRoute from  "./routes/User.routes.js";
import Taskroute from "./routes/Task.routes.js";
app.get("/", (req, res) => {
    res.send("Task manager api is running")
});
//use routes
app.use("/api/v1/users",RegisterRoute)
app.use("/api/v1/users",Taskroute);
export default app;