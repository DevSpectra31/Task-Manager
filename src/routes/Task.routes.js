import { CreateTask,getalltasks,getTaskbyId,updateTask,deleteTask } from "../controllers/Task.controller.js";
import { auth } from "../middlewares/Auth.middleware.js";
import express from "express";
const router=express.Router();
//secured routes
router.use(auth);
//task route
router.post("/create",CreateTask);
router.get("/gettask",getalltasks);
router.get("/gettaskid/:id",getTaskbyId);
router.put("/updatetask/:id",updateTask);
router.delete("/deletetask/:id",deleteTask);
export default router;