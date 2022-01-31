import "./styles/style.css";
import { TaskService } from "./Service/TaskService";
import { CategoryService } from "./Service/CategoryService";
import { Form } from "./Form/Form";
import { CategoryCreator } from "./Creator/CategoryCreator";
import { Container } from "./Container";
import { Category } from "./Category/Category";
import { TaskObject } from "./validators/taskValidators";
import { CategoryObject } from "./validators/categoryValidators";
import { UserController } from "./User/UserController";
import { Task } from "./Task";

interface Data {
    tasksData: TaskObject[];
    categoryData: CategoryObject[];
}

class Main {
    root = document.getElementById("root") as HTMLElement;
    // Store data of user here!
    // Pass the user data by props!
    form = new Form();
    userController = new UserController();

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

    run() {
        this.createElements();
    }

    private async createElements() {
        if (this.root) {
            this.root.innerHTML = "";
            await this.userController.initHTML();
        }
        document.addEventListener("logged", () => {
            const user: string = this.userController.returnUserData();
            this.userLoggedIn(user);
        });
    }

    private async userLoggedIn(user: string) {
        this.form.createForm(this.root);
        this.form.userName = user;

        this.columns.forEach((column) => {
            const container = new Container(column.id, column.name);
            container.createContainer();
        });
        const dataObject = await this.getData();
        this.createTasks(dataObject.tasksData);
        this.createCategories(dataObject.categoryData);
        this.checkCategories(dataObject.categoryData);
        this.bindEvents();
    }

    private async getData(): Promise<Data> {
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

    private createTasks(tasksArray: TaskObject[]): void {
        const currentUser = this.userController.returnUserData();
        tasksArray.forEach((task: TaskObject) => {
            const taskInstance = new Task(task, currentUser);
            taskInstance.addTask();
        });
    }

    private createCategories(categoriesArray: CategoryObject[]): void {
        categoriesArray.forEach((category: CategoryObject) => {
            const categoryInstance = new Category(category.name, category._id, category.color);
            categoryInstance.categoryCreate();
        });
    }

    private checkCategories(categoriesArray: CategoryObject[]): void {
        if (categoriesArray && categoriesArray.length <= 4) {
            CategoryCreator.createCategoryInput();
        }
        Category.checkCategoryLength();
    }

    private bindEvents(): void {
        this.form.bindEvents();
        Category.bindEvents();
    }
}
export { Main };

const container = new Main();
container.run();
