import { TaskService } from "./Service/TaskService";
import { CategoryService } from "./Service/CategoryService";
import { Form } from "./Form/Form";
import { FormCreator } from "./Creator/FormCreator";
import { CategoryCreator } from "./Creator/CategoryCreator";
import { Container } from "./Container";
import { Category } from "./Category/Category";
import { TaskObject } from "./validators/taskValidators";
import { CategoryObject } from "./validators/categoryValidators";

interface Data {
    tasksData: TaskObject[];
    categoryData: CategoryObject[];
}

class Main {
    root = document.getElementById("root") as HTMLElement;

    formCreator = new FormCreator();
    form = new Form();

    columns: { id: string; name: string }[] = [
        {
            id: "0",
            name: "todo 🚀 ",
        },
        {
            id: "1",
            name: "going 🏃🏻‍♂️",
        },
        {
            id: "2",
            name: "done ✅",
        },
    ];

    createElements(): void {
        if (this.root) {
            this.root.innerHTML = "";
            this.formCreator.createForm(this.root);
        }
        this.columns.forEach((column) => {
            const container = new Container(column.id, column.name);
            container.createContainer();
        });
    }

    createTasks(tasksArray: TaskObject[]): void {
        tasksArray.forEach((task: TaskObject) => Form.addTask(task));
    }

    createCategories(categoriesArray: CategoryObject[]): void {
        categoriesArray.forEach((category: CategoryObject) => {
            const categoryInstance = new Category(category.name, category._id, category.color);
            categoryInstance.categoryCreate();
        });
    }

    checkCategories(categoriesArray: CategoryObject[]): void {
        if (categoriesArray && categoriesArray.length <= 4) {
            CategoryCreator.createCategoryInput();
        }
        Category.checkCategoryLength();
    }

    async getData(): Promise<Data> {
        const [taskArray, categoryArray] = await Promise.all([
            TaskService.getData(),
            CategoryService.getData(),
        ]);

        const dataObject: Data = {
            tasksData: taskArray,
            categoryData: categoryArray,
        };

        return dataObject;
    }

    bindEvents(): void {
        this.form.bindEvents();
        Category.bindEvents();
    }
    async run() {
        this.createElements();
        const dataObject = await this.getData();
        this.createTasks(dataObject.tasksData);
        this.createCategories(dataObject.categoryData);
        this.checkCategories(dataObject.categoryData);
        this.bindEvents();
    }
    // Promise all
}
export { Main };
