import { Task } from "../models/task.model.js";
//create task
const CreateTask=async(req,res)=>{
  try {
      const task=await Task.create({
          ... req.body,
          owner:req.user._id,
      })
      if(!req.body.title){
        return res.status(401).json({message:"title is required for task creation"})
      }
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
    const match={}
    const sort={}
    //filtering
    if(req.query.completed){
      match.completed = req.query.completed === 'true';
    }
    //sorting
    if(req.query.sortBy){
      const parts=req.query.sortBy.split(':');
      sort[parts[0]]=parts[1] === 'desc' ? -1 : 1
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
  
  
    const tasks = await Task.find({ owner: req.user._id, ...match })
  .limit(limit)
  .skip(skip)
  .sort(sort);
  
  
  res.json({
  page,
  limit,
  count: tasks.length,
  tasks
  });
  } catch (error) {
    return res.status(401).json({message:"something went wrong"});
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
       owner:req.user._id,
     },
     req.body,
     {
      new : true,
      runValidators:true,
     }
   )
   if(!task){
     return res.status(401).json({
       message:"The task you wanting to update is not found",
     })
   }
   res.status(201).json(task);
 } catch (error) {
  res.status(500).json({message:"not able update task"});
 }
}
// delete the task
const deleteTask=async(req,res)=>{
  try {
    const task=await Task.findOneAndDelete(
      {
        _id:req.params.id,
        owner:req.user._id,
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