// Express
const server = require("express");
const cors = require("cors");
const app = server();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//  DATABSE CONN
mongoose.connect("mongodb://localhost:27017/VishalzToDoList");
mongoose.connection.on("connected", () => {
    console.log("DB CONNECTED");
});


const { createNewTask, updateTask, getTask, deleteTask, updateTaskStatus, getTaskbyslno} = require("./src/controllers/controllers")

app.use(cors());
app.use(bodyParser.json());
app.get("/todo", getTask);
app.get("/get-task-by-slno",getTaskbyslno)
app.post("/create-new-task", createNewTask);
app.put("/update-task", updateTask);
app.patch("/update-task-status", updateTaskStatus);
app.delete("/delete-task", deleteTask);

app.listen(3000, () => {
    console.log("Server Started on port 3000");
}); 