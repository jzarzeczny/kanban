interface TaskObject {
    header: string;
    content: string;
    color: string;
    position?: string;
}

interface TaskEdit {
    id: string;
    content?: string;
    position?: string;
}
class Service {
    static _instance: any;

    // Singleton pattern implementation
    constructor() {
        if (Service._instance) {
            return Service._instance;
        }
        Service._instance = this;
    }
    static url: string = "http://localhost:5002/mongo/";

    static async addItem(task: TaskObject) {
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
        const response = await fetch(`${this.url}${taskID}`, {
            method: "DELETE",
        });
        return response.json(); //Something is wrong with return value
    }
    static updateItem = async (task: TaskEdit) => {
        const taskObject = {
            id: task.id,
            content: task.content,
            position: task.position,
        };
        const response = await fetch(`${this.url}${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskObject),
        });
        return response.json();
    };

    static async getData() {
        const data = await fetch(`${this.url}`)
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
        return data;
    }

    // async logResponse(response) {
    //     const message = await response.json();
    //     console.log(message.message);
    // }
}

export { Service };
