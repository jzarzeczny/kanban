import { Service } from "./Service";

class TaskService extends Service {
    url: string;
    constructor(url: string) {
        super();
        this.url = url;
    }
}

export { TaskService };
