import { Service } from "./Service";
import { TaskEdit, NewTaskObject, TaskObject } from "../validators/taskValidators";

class TaskService extends Service {
    static get url(): string {
        return "http://localhost:5002/mongo/";
    }
    public async addItem(item: NewTaskObject): Promise<string> {
        return Service.addItem(item as TaskObject);
    }
    public async deleteItem(taskID: string) {
        Service.deleteItem(taskID as string);
    }
    public async updateItem(task: TaskEdit) {
        Service.updateItem(task as TaskEdit);
    }
    public async getData(): Promise<TaskObject[]> {
        return Service.getData();
    }
}

export { TaskService };
