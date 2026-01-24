import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import  jwt  from "jsonwebtoken";
import {asyncHandler} from "../utils/Asychandler.js";
import cookie from "cookie-parser"
import {generateAccessAndRefreshToken} from "../utils/generatAccessandRefreshToken.js";
//signup
const SignUp = asyncHandler(async (req, res) => {
    console.log("req.body : ",req.body);
    const {username, password} = req.body;
    if(!username || !password){
        throw new ApiError(400,"username and password is required to register a user");
    }
    const existeduser = await User.findOne({username});
    if(existeduser){
        throw new ApiError(400,"user already existed same username")
    }
    const user = await User.create({
        username:username,
        password:password,
    });
    const createduser = await User.findById(user._id).select("-password");
    if(!createduser){
        throw new ApiError(400,"Error while creating a user");
    }
    // const {accesstoken,refreshtoken}=await generateAccessAndRefreshToken(createduser._id);
    // const options={
    //     httpOnly:true,
    //     secure:false,
    // }
    return res
    .status(200)
    // .cookie("AccessToken",accesstoken,options)
    // .cookie("RefreshToken",refreshtoken,options)
    .json(new ApiResponse(200, createduser,"User created successfully"));
});
export{SignUp};