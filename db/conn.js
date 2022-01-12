const mongoDB = require("../config");
const mongoose = require("mongoose");

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    header: String,
    content: String,
    color: String,
    position: Number,
    id: Number,
});

// const Tasks = mongoose.model("Tasks", TaskSchema);

// const task = new Tasks({
//    header: "Task 1",
//    content: "content",
//    color: "#392123",
//    position: 1,
//    id: 4,
// });
// task.save(function (err) {
//    if (err) return handleError(err);
// });

module.exports = db;
