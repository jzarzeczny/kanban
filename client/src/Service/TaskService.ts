import { Service } from "./Service";

class TaskService extends Service {
    constructor() {
        super();
    }
    static URI: string = "http://localhost:5002/mongo/";
}

export { TaskService };
