import { Service } from "./Service";
import { Form } from "./Form";
import { FormCreator } from "./Creator/FormCreator";
import { Container } from "./Container";
import { TaskObject } from "./validators/taskValidators";

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
            container.create();
        });
        form.bindEvents();
        const tasksArray = await Service.getData();
        tasksArray.forEach((task: TaskObject) => Form.addTask(task));
    }
}
export { Main };
