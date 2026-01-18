import  mongoose , {Schema, Types} from "mongoose";
const taskSchema = new Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description : {
            type:String,
            required:true,
        },
        completed:{
            type:Boolean,
            default:false,
        },
        priority:{
            type:String,
            enum :['low','medium','high'],
            default:'medium',
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
    },
    {timestamps:true}
)
export const Task=mongoose.model('Task',taskSchema);