import { Service } from "./Service";
import { NewCategoryObject, CategoryObject } from "../validators/categoryValidators";

class CategoryService extends Service {
    static get url(): string {
        return "http://localhost:5002/mongo/category/";
    }
    public async addItem(item: NewCategoryObject): Promise<string> {
        return Service.addItem(item as CategoryObject);
    }
    public async deleteItem(taskID: string) {
        Service.deleteItem(taskID as string);
    }

    public async getData(): Promise<CategoryObject[]> {
        return Service.getData();
    }
}

export { CategoryService };
