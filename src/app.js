import express from "express";
import cors from "cors";
import helmet from "helmet";
const app = express();
//middlewares
app.use(express.json());
app.use(cors);
app.use(helmet());
app.use(express.urlencoded());
//import error middleware
import { Error_middleware } from "./middlewares/Errror.middleware.js";
//import routes
import RegisterRoute from  "./routes/User.routes.js";
import Taskroute from "./routes/Task.routes.js";
app.get("/", (req, res) => {
    res.send("Task manager api is running")
});
//error middleware
app.use(Error_middleware)
//use routes
app.use("/api/v1/users",RegisterRoute)
app.use("/api/v1/users",Taskroute);
export default app;