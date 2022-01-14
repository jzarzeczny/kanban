import { Service } from "./Service.js";
import { CardCreator } from "./Creator/CardCreator.js";

interface TaskObject {
    header: string;
    content: string;
    color: string;
    _id: string;
    position?: string;
}
interface NewItem {
    header: string;
    content: string;
    color: string;
    _id: string;
}

class Form {
    cardCreator = new CardCreator();

    service = new Service();

    static async addTask(task: TaskObject, fresh: boolean = false) {
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
        const properContainer = document.getElementById(task.position);
        properContainer?.appendChild(taskElement);
    }

    handleInput(this: HTMLFormElement, ev: SubmitEvent) {
        ev.preventDefault();
        const inputElement = ev.target as HTMLFormElement;

        const header: string = (inputElement[0] as HTMLInputElement).value;
        const content: string = (inputElement[1] as HTMLInputElement).value;
        const color: string = (
            document.querySelector("input[name='color']:checked") as HTMLInputElement
        ).value;
        const _id: string = "";

        const newTask: NewItem = {
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
    toggleClass(this: HTMLElement) {
        this.parentElement?.classList.toggle("add__container--open");
    }

    bindEvents = () => {
        const button = document.getElementById("openButton") as HTMLElement;
        const form = document.getElementById("form") as HTMLFormElement;

        button?.addEventListener("click", this.toggleClass);
        form?.addEventListener("submit", this.handleInput);
    };
}

export { Form };
