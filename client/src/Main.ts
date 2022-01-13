import { Service } from "./Service";
import { Form } from "./Form";
import { FormCreator } from "./Creator/FormCreator";
import { ContainerCreator } from "./Creator/ContainerCreator";

interface TaskObject {
    header: string;
    container: string;
    color: string;
    id: string;
    position?: number;
}

class Main {
    root = document.getElementById("root");

    service = new Service();
    form = new Form();
    formCreator = new FormCreator();
    containerCreator = new ContainerCreator();

    columns:{id: number, name:string}[] = [
        {
            id: 0,
            name: "todo",
        },
        {
            id: 1,
            name: "going",
        },
        {
            id: 2,
            name: "done",
        },
    ];
    async run() {
        this.root!.innerHTML = "";
        this.formCreator.createForm(this.root :HTMLElement);
        this.columns.forEach((column) => {
            this.containerCreator.createContainer(column.id:number, column.name);
        });
        this.form.bindEvents();
        const tasksArray = await this.service.getData();
        tasksArray.forEach((task<TaskObject>) => this.form.addTask(task));
    }
}
export { Main };
