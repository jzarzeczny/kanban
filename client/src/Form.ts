import { Service } from "./Service";
import { CardCreator } from "./Creator/CardCreator";

interface TaskObject {
    header: string;
    content: string;
    color: string;
    _id: string;
    position?: number | string;
}
class Form {
    form = document.getElementById("form");

    cardCreator = new CardCreator();

    service = new Service();

    addTask(task: TaskObject, fresh: boolean = false) {
        const taskElement = this.cardCreator.createTaskCard(
            task.header,
            task.content,
            task.color,
            task._id
        );
        task.position = task.position || 0;
        const properContainer = document.getElementById(task.position);
        properContainer.appendChild(taskElement);

        if (fresh) {
            this.service.addItem(task);
        }
    }

    handleInput = (e: any) => {
        e.preventDefault();
        const header = e.target[0].value;
        const content = e.target[1].value;
        const color = document.querySelector("input[name='color']:checked")?.value;

        const newTask = {
            header,
            content,
            color,
        };
        this.addTask(newTask, true);
        const form = document.getElementById("form");

        form.parentElement.classList.toggle("add__container--open");
        form.reset();
    };
    toggleClass(e) {
        e.target.parentElement.classList.toggle("add__container--open");
    }

    bindEvents() {
        const button = document.getElementById("openButton");
        button.addEventListener("click", this.toggleClass);
        form.addEventListener("submit", this.handleInput);
    }
}

export { Form };
