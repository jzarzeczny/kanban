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

    async addTask(task: TaskObject, fresh: boolean = false) {
        let _id: string = task._id;
        if (fresh) {
            _id = await this.service.addItem(task);
        }
        const taskElement: HTMLElement = this.cardCreator.createTaskCard(
            task.header,
            task.content,
            task.color,
            _id
        );
        task.position = task.position || "0";
        const properContainer = document.getElementById(task.position);
        properContainer?.appendChild(taskElement);
    }

    handleInput = (e: InputEvent) => {
        e.preventDefault();
        const inputElement = e?.target as HTMLInputElement;

        const header: string = inputElement[0].value;
        const content: string = inputElement[1].value;
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
        this.addTask(newTask, true);
        const form = document.getElementById("form") as HTMLFormElement;

        form?.parentElement?.classList.toggle("add__container--open");
        form?.reset();
    };
    toggleClass(e: any) {
        e.target.parentElement.classList.toggle("add__container--open");
    }

    bindEvents = () => {
        const button = document.getElementById("openButton") as HTMLElement;
        const form = document.getElementById("form") as HTMLFormElement;

        button?.addEventListener("click", this.toggleClass);
        form?.addEventListener("submit", this.handleInput);
    };
}

export { Form };
