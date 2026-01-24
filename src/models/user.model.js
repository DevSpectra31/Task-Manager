import mongoose  ,{Schema}from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userschema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            index:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
        },
        refreshtoken:{
            type:String,
        }
    },
    {timestamps:true},
);
userschema.pre('save', async function() {
        if (!this.isModified("password")) return ;
        this.password = await bcrypt.hash(this.password, 10);
});
userschema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}
userschema.methods.generateAccessToken=function(){
    jwt.sign(
        {
            _id:this._id,
            username:this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIERY}
    )
}
userschema.methods.generateRefreshToken=function(){
    jwt.sign(
        {
            _id:this._id,
            username:this.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIERY}
    )
}
export const User = mongoose.model("User", userschema);