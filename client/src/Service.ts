import { TaskEdit, NewTaskObject, TaskObject } from "./validators/taskValidators";

class Service {
    // static _instance: any;

    // // Singleton pattern implementation
    // constructor() {
    //     if (Service._instance) {
    //         return Service._instance;
    //     }
    //     Service._instance = this;
    // }
    static url: string = "http://localhost:5002/mongo/";

    static async addItem(task: NewTaskObject): Promise<string> {
        const response = await fetch(`${this.url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
        const body = await response.json();
        return body._id;
    }
    static async delateItem(taskID: string) {
        await fetch(`${this.url}${taskID}`, {
            method: "DELETE",
        });
    }
    static updateItem = async (task: TaskEdit) => {
        const taskObject = {
            id: task.id,
            content: task.content,
            position: task.position,
        };
        await fetch(`${this.url}${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskObject),
        });
    };

    static async getData(): Promise<TaskObject[]> {
        const data = await fetch(`${this.url}`)
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
        return data;
    }
}

export { Service };
