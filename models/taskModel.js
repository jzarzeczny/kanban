const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskModelSchema = new Schema({
   header: String,
   content: String,
   color: String,
   position: Number,
   id: Number,
});

TaskModelSchema.virtual("url").get(() => {
   return "/tasks";
});

module.exports = mongoose.model("TaskModel", TaskModelSchema);
