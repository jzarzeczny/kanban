import { TaskEdit, NewTaskObject, TaskObject } from "../validators/taskValidators";
import { CategoryObject, NewCategoryObject } from "../validators/categoryValidators";

class Service {
    // static _instance: any;

    // // Singleton pattern implementation
    // constructor() {
    //     if (Service._instance) {
    //         return Service._instance;
    //     }
    //     Service._instance = this;
    // }
    static URL: string = "http://localhost:5002/mongo/";

    static async addItem(
        item: NewTaskObject | NewCategoryObject,
        path: string = ""
    ): Promise<string> {
        const response = await fetch(`${this.URL}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });
        const body = await response.json();
        return body._id;
    }
    static async deleteItem(itemID: string, path: string = "") {
        await fetch(`${this.URL}${path}${itemID}`, {
            method: "DELETE",
        });
    }
    static updateItem = async (item: TaskEdit, path: string = "") => {
        const taskObject = {
            id: item.id,
            content: item.content,
            position: item.position,
        };
        await fetch(`${this.URL}${path}${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskObject),
        });
    };

    static async getData(path: string = "") {
        // declare return value as Promise<TaskEdit[]> | Promise<CategoryObject[]>
        const data = await fetch(`${this.URL}${path}`)
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
        return data as CategoryObject[] | TaskObject[];
    }
}

export { Service };
