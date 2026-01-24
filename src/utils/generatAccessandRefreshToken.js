import { User } from "../models/user.model.js";
import { ApiError } from "./ApiError.js";
const generateAccessAndRefreshToken=async(userId)=>{
   try {
     console.log("USER ID : ",userId);
     const user=await User.findById(userId)
     if(!user){
         throw new ApiError (400,"user doesn't exist");
     }
     const accesstoken=await user.generateAccessToken();
     const refreshtoken=await user.generateRefreshToken();
     user.accesstoken=accesstoken;
     user.refreshtoken=refreshtoken;
     await user.save({validateBeforeSave:false});
     return {accesstoken,refreshtoken};
   } catch (error) {
    throw new ApiError(500,"something went wrong while generating acccess and refresh token");
   }

}
export{generateAccessAndRefreshToken};