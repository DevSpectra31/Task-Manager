import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";
const auth=async(req,res,next)=>{
    try {
        const header=req.header("Authorization");
        if(!header ||!header.startsWith('Bearer ')){
            return res.status(401).json({
                message:"No token provided",
            })
        }
        const token=header.replace('Bearer','').trim()
        const decoded_token=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded_token.id).select("-password");
        if(!user){
            return res.status(401).json({
                message:"User not found",
            })
        }
        req.user=user;
        next();
    } catch (error) {
        console.error("Token error : ",error);
        return   res.status(500).json({
            message:"No invalid token",
        })
    }
}
export{auth}