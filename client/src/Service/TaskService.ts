import { Service } from "./Service";

class TaskService extends Service {
    static get url(): string {
        return "http://localhost:5002/mongo/";
    }
}

export { TaskService };
