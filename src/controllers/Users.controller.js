import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/user.model";
import  jwt  from "jsonwebtoken";
import {asyncHandler} from "../utils/Asychandler.js"
//signup
const SignUp=asyncHandler=asyncHandler(async(req,res)=>{
    const {username, password}=req.body;
    
})