import {registerUser,LoginUser} from "../controllers/Users.controller.js";
import { auth } from "../middlewares/Auth.middleware.js";
import { profile } from "../controllers/Users.controller.js";
import express from "express";
const router=express.Router();
router.post("/register",registerUser);
router.post("/login",LoginUser);
router.get("/token",auth,profile)
export default router;

