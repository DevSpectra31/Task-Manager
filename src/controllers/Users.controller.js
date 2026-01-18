import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";
const registerUser=async(req,res)=>{
   try {
    console.log("Req.body : ",req.body)
     const {username,email,password}=req.body;
     if(!username || !email || !password){
         return res.status(404).json({message:"All fileds are required"});
     }
     const exitUser=await User.findOne({email});
     if(exitUser){
         return res.status(400).json({
             message:"User is already registered with same email",
         })
     }
     const user=await User.create({username,email,password});
     return res.status(201).json({
         message:"User successfully registered ",
         User:{
             id:user._id,
             username:user.username,
             email:user.email,
         },
     });
   } catch (error) {
    console.error("Register User error : ",error);
    return res.status(500).json({
        message:"Something went wrong while registering a user",
    })
   }
}
const LoginUser=async(req,res)=>{
   try {
     const {email,password}=req.body;
     if(!email || !password){
         return res.status(400).json({
             message:"Email and password are required",
         })
     }
         const user=await User.findOne({email});
         if(!user){
             return res.status(404).json({
                 message:"User doesn't exist",
             })
         }
         const token=jwt.sign(
             {id:user._id},
             process.env.JWT_SECRET,
             {expiresIn:'1d'}
         );
         res.json({
             message:"Login Successful",
             token,
         })
   } catch (error) {
    console.error("Login User error : ", error);
    return res.status(500).json({
        message: "Something went wrong while logging in",
    });
   }
}
const profile=async(req,res)=>{
    res.json(req.user);
}
export{registerUser, LoginUser,profile}