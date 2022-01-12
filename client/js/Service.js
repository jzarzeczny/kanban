class Service {
    // Singleton pattern implementation
    constructor() {
        if (Service._instance) {
            return Service._instance;
        }
        Service._instance = this;
    }

    async addItem(task) {
        const response = await fetch("http://localhost:5002/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
        this.logResponse(response);
    }
    async delateItem(taskID) {
        const response = await fetch(`http://localhost:5002/tasks/${taskID}`, {
            method: "DELETE",
        });
        this.logResponse(response);
    }
    updateItem = async (task) => {
        const taskObject = {
            id: task.id,
            content: task.content,
            position: task.position,
        };
        const response = await fetch(`http://localhost:5002/tasks/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskObject),
        });
        this.logResponse(response);
    };

    async getData() {
        const data = await fetch("http://localhost:5002/tasks")
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
        return data;
    }
    async logResponse(response) {
        const message = await response.json();
        console.log(message.message);
    }
}

export default Service;
