import { Service } from "./Service";

class CategoryService extends Service {
    constructor() {
        super();
    }
    static URI: string = "http://localhost:5002/mongo/category";
}

export { CategoryService };
