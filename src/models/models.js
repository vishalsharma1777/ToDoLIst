const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    slno:{
        type:Number,
        unique: true
    },
    title: String,
    description: String,
    status: {
        "type": Boolean,
        "default": false
    }
});


const TodoList = mongoose.model("ToDoList", todoSchema);

module.exports = { TodoList };