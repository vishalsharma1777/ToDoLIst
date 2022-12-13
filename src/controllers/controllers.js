const { request, response } = require("express");
const { TodoList } = require("../models/models");

//create a new task
const createNewTask = async (request, response) => {
    try{
    console.log(request.body);
    await TodoList.create(request.body);
    return response.json({data:"Task Created"});}
    catch{
        return response.status(404).json({status: "Error", msg: "Serial Number already exists"});
    }
}

//view all the tasks
const getTask = async (request, response) => {
    var taskId = request.query.slno;

    if(taskId){
        try{
            var allTask = await TodoList.findById(taskId);
        }
        catch{
            allTask = null;
        }
    }
    else{
        var allTask = await TodoList.find({});
    }
    
    return response.json(allTask);
};

//view a specific task by serial number
const getTaskbyslno = async (request, response) => {
    var taskId = request.query.slno;

        try{
            var allTask = await TodoList.findOne({slno:taskId});
            if(!allTask) {
                return response.status(404).json({status: "Error", msg: "Serial Number does not exist"});
            }
        }
        catch{
            allTask = null;
            if(!allTask) {
                return response.status(404).json({status: "Error", msg: "Serial Number does not exist"});
            }
        }
    
    return response.json(allTask);
};

//update a task
const updateTask = async (request, response) => {
    var taskId = request.query.slno;

        try{
            var task = await TodoList.findOne({slno:taskId});
            if(!task) {
                return response.status(404).json({status: "Error", msg: "Serial Number does not exist"});
            }
        }catch{
            return response.status(404).json({status: "Error", msg: "Serial Number does not exist"});
        }
        
        await TodoList.findOneAndUpdate({slno:taskId},request.body);
    return response.json({data: "Task Updated"});
}

//update the task status
const updateTaskStatus = async (request, response) => {
    var taskId = request.query.slno;
        console.log(request.body, taskId, request.body.status);


        try{
            var task = await TodoList.findOne({slno:taskId});
            if(!task) {
                return response.status(404).json({status: "Error", msg: "Serial Number does not exist"});
            }
        }catch{
            return response.status(404).json({status: "Error", msg: "Serial Number does not exist"});
        }
        var status = await request.body.status;
        console.log(status);
        if(status == undefined){
            request.body.status = true;
            console.log(request.body);
        }

        await TodoList.findOneAndUpdate({slno:taskId}, request.body);
    return response.json({data: "Task Status Updated"});
}

//delete a task
const deleteTask = async (request, response) => {
    var taskId = request.query.slno;
        try{
            var task = await TodoList.findOne({ slno:taskId });
            if(!task) {
                return response.status(404).json({status: "Error", msg: "Serial Number does not exist"});
            }
        }catch{
            return response.status(404).json({status: "Error", msg: "Serial Number does not exist"});
        }
        console.log(taskId)
        await TodoList.findOneAndDelete({ slno:taskId });
        return response.json({data: "Task Deleted"});
        
}





module.exports = {getTask, createNewTask, updateTask, deleteTask, updateTaskStatus,getTaskbyslno};