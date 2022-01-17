import { Service } from "./Service";
import { CardCreator } from "./Creator/CardCreator";
import { TaskObject } from "./validators/taskValidators";

class Form {
    cardCreator = new CardCreator();

    service = new Service();

    static async addTask(task: TaskObject, fresh: boolean = false): Promise<void> {
        let _id: string = task._id;
        if (fresh) {
            _id = await Service.addItem(task);
        }
        const taskElement: HTMLElement = CardCreator.createTaskCard(
            task.header,
            task.content,
            task.color,
            _id
        );
        task.position = task.position || "0";
        const properContainer = document.getElementById(task.position) as HTMLElement;
        properContainer.appendChild(taskElement);
    }

    handleInput(this: HTMLFormElement, ev: SubmitEvent): void {
        ev.preventDefault();
        const inputElement = ev.target as HTMLFormElement;

        const header: string = (inputElement[0] as HTMLInputElement).value;
        const content: string = (inputElement[1] as HTMLInputElement).value;
        const color: string = (
            document.querySelector("input[name='color']:checked") as HTMLInputElement
        ).value;
        const _id: string = "";

        const newTask: TaskObject = {
            header,
            content,
            color,
            _id,
        };
        Form.addTask(newTask, true);
        const form = document.getElementById("form") as HTMLFormElement;

        form?.parentElement?.classList.toggle("add__container--open");
        form?.reset();
    }
    toggleClass(this: HTMLElement): void {
        this.parentElement?.classList.toggle("add__container--open");
    }

    bindEvents = (): void => {
        const button = document.getElementById("openButton") as HTMLElement;
        const form = document.getElementById("form") as HTMLFormElement;

        button?.addEventListener("click", this.toggleClass);
        form?.addEventListener("submit", this.handleInput);
    };
}

export { Form };
