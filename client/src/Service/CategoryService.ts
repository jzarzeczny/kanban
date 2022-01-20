import { Service } from "./Service";

class CategoryService extends Service {
    static get url(): string {
        return "http://localhost:5002/mongo/category";
    }
}

export { CategoryService };
