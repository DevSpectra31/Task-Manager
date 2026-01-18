import mongoose  ,{Schema}from "mongoose";
import bcrypt from "bcrypt"
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
export const User = mongoose.model("User", userschema);