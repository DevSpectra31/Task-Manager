import { Task } from "../models/task.model.js";
//create task
const CreateTask=async(req,res)=>{
  try {
      const task=await Task.create({
          ... req.body,
          owner:req.user._id,
      })
      res.status(201).json(task);
      res.json({message:"Task created successfully"});
      
  } catch (error) {
    console.error("Task creation error : ",error);
    res.status(401).json({
        message:"something went wrong while creating a task"
    })
  }
}
//get all tasks
const getalltasks=async(req,res)=>{
  try {
    const tasks=await Task.find({owner:req.user._id});
    res.status(201).json(tasks);
    res.json({message:"fetched all tasks successfully"});
  } catch (error) {
    console.error("Task not found");
    return res.status(500).json({
      message:"something went wrong while fetching the all the tasks"
    })
  }
}
//get a single task
const getTaskbyId=async(req,res)=>{
try {
    const task=await Task.findOne({
      _id:req.params.id,
      owner:req.user._id,
    })
    if(!task){
      return res.status(401).json({message:"Task not found"})
    }
    res.status(201).json(task);
    res.json({message:"Fetched particular task"})
} catch (error) {
  console.error("Task error");
  res.status(500).json(500).json({
    message:"something went wrong"
  })
}
}
//update the task
const updateTask=async(req,res)=>{
 try {
   const task=await Task.findOneAndUpdate(
     {
       _id:req.params.id,
       owner:req.user_.id,
     }
   )
   if(!task){
     return res.status(401).json({
       message:"The task you wanting to update is not found",
     })
   }
   res.status(201).json(task);
 } catch (error) {
  console.error("not able to fetch");
  res.status(500).json({message:"not able update task"});
 }
}
// delete the task
const deleteTask=async(req,res)=>{
  try {
    const task=await Task.findOneAndDelete(
      {
        _id:req.params.id,
        owner:req.user_.id,
      }
    )
    if(!task){
      return res.status(401).json({message:"Task not found"})
    }
    res.status(201).json({message:"task deleted successfully"});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({message:"something went wrong while deleting "})
  }
}
export{CreateTask,getalltasks,getTaskbyId,updateTask,deleteTask}