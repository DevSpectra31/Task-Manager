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
        email:{
            type:String,
            required:true,
            unique:true,
            index:true,
            lowercase:true,
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
userschema.methods.generateAccessToken=async function(){
    jwt.sign(
        {
            _id:this._id,
            username:this.username,
        },
        process.env.ACCESS_TOKEN,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIERY}
    )
}
userschema.methods.generateRefreshToken=async function(){
    jwt.sign(
        {
            _id:this._id,
            username:this.username,
        },
        process.env.REFRESH_TOKEN,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIERY}
    )
}
export const User = mongoose.model("User", userschema);