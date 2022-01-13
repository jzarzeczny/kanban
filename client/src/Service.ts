interface TaskObject {
    header: string;
    content: string;
    color: string;
    id: string;
    position?: number;
}

interface TaskEdit {
    id: string;
    content?: string;
    position?: number;
}
class Service {
    // Singleton pattern implementation
    constructor() {
        if (Service._instance) {
            return Service._instance;
        }
        Service._instance = this;
    }
    url = "mongo/";

    async addItem(task: TaskObject) {
        const response = await fetch(`http://localhost:5002/${this.url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
    }
    async delateItem(taskID: string) {
        const response = await fetch(`http://localhost:5002/${this.url}/${taskID}`, {
            method: "DELETE",
        });
    }
    updateItem = async (task: TaskEdit) => {
        const taskObject = {
            id: task.id,
            content: task.content,
            position: task.position,
        };
        const response = await fetch(`http://localhost:5002/${this.url}/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskObject),
        });
    };

    async getData() {
        const data = await fetch(`http://localhost:5002/${this.url}`)
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
