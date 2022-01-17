import { Service } from "./Service.js";
import { Form } from "./Form.js";
import { FormCreator } from "./Creator/FormCreator.js";
import { ContainerCreator } from "./Creator/ContainerCreator.js";
import { TaskObject } from "./validators/taskValidators";

class Main {
    root = document.getElementById("root") as HTMLElement;

    formCreator = new FormCreator();
    containerCreator = new ContainerCreator();

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
        const tasksArray = await Service.getData();
        tasksArray.forEach((task: TaskObject) => Form.addTask(task));
    }
}
export { Main };
