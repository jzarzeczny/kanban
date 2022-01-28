import { Schema, model } from "mongoose";
import { Task } from "../validators/taskValidators";

const TaskModelSchema = new Schema<Task>({
    header: String,
    content: String,
    color: String,
    position: Number,
    author: String,

    editList: [
        {
            author: String,
            change: String,
            time: Number,
        },
    ],
});
const taskModel = model("TaskModel", TaskModelSchema);
export { taskModel };
