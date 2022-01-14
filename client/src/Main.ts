import { Service } from "./Service.js";
import { Form } from "./Form.js";
import { FormCreator } from "./Creator/FormCreator.js";
import { ContainerCreator } from "./Creator/ContainerCreator.js";

interface TaskObject {
    header: string;
    content: string;
    color: string;
    _id: string;
    position?: string;
}

class Main {
    root = document.getElementById("root") as HTMLElement;

    formCreator = new FormCreator();
    containerCreator = new ContainerCreator();
    service = new Service();

    columns: { id: string; name: string }[] = [
        {
            id: "0",
            name: "todo",
        },
        {
            id: "1",
            name: "going",
        },
        {
            id: "2",
            name: "done",
        },
    ];
    async run() {
        const form = new Form();

        this.root!.innerHTML = "";
        this.formCreator.createForm(this.root);
        this.columns.forEach((column) => {
            this.containerCreator.createContainer(column.id, column.name);
        });
        form.bindEvents();
        const tasksArray = await this.service.getData();
        tasksArray.forEach((task: TaskObject) => form.addTask(task));
    }
}
export { Main };
