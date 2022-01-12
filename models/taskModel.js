const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskModelSchema = new Schema({
    header: String,
    content: String,
    color: String,
    position: Number,
});

module.exports = mongoose.model("TaskModel", TaskModelSchema);
