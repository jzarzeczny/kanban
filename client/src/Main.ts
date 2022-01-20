import { TaskService } from "./Service/TaskService";
import { CategoryService } from "./Service/CategoryService";
import { Form } from "./Form/Form";
import { FormCreator } from "./Creator/FormCreator";
import { CategoryCreator } from "./Creator/CategoryCreator";
import { Container } from "./Container";
import { Category } from "./Category";
import { TaskObject } from "./validators/taskValidators";
import { CategoryObject } from "./validators/categoryValidators";

class Main {
    root = document.getElementById("root") as HTMLElement;

    formCreator = new FormCreator();

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
    async run() {
        if (this.root) {
            this.root.innerHTML = "";
            this.formCreator.createForm(this.root);
        }
        const form = new Form();
        this.columns.forEach((column) => {
            const container = new Container(column.id, column.name);
            container.createContainer();
        });

        const tasksArray = (await TaskService.getData()) as TaskObject[];
        tasksArray.forEach((task: TaskObject) => Form.addTask(task));
        const categoriesArray = (await CategoryService.getData()) as CategoryObject[];
        categoriesArray.forEach((category: CategoryObject) => {
            const categoryInstance = new Category(category.name, category._id, category.color);
            categoryInstance.categoryCreate();
        });
        if (categoriesArray && categoriesArray.length <= 4) {
            CategoryCreator.createCategoryInput();
        }
        Category.checkCategoryLength();
        form.bindEvents();
    }
}
export { Main };
