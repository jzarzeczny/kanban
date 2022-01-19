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
        if (properContainer) {
            properContainer.appendChild(taskElement);
        }
    }

    static async addCategory(color: string, name: string): Promise<void> {
        console.log(color);
        console.log(name);
    }

    handleFormInput(this: HTMLFormElement, ev: SubmitEvent): void {
        ev.preventDefault();
        if (ev.submitter && ev.submitter.classList.contains("submit-form")) {
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
    }

    handleCategoryInput(this: HTMLElement, ev: MouseEvent): void {
        ev.stopPropagation();
        const colorInput = document.getElementById("newCategory") as HTMLInputElement;
        const nameInput = document.getElementById("newColor") as HTMLInputElement;

        Form.addCategory(colorInput.value, nameInput.value);
    }

    toggleClass(this: HTMLElement): void {
        this.parentElement?.classList.toggle("add__container--open");
    }

    bindEvents = (): void => {
        const button = document.getElementById("openButton") as HTMLElement;
        const form = document.getElementById("form") as HTMLFormElement;
        const addCategoryButton = document.getElementById("addCategory") as HTMLElement;
        addCategoryButton.addEventListener("click", this.handleCategoryInput);
        button.addEventListener("click", this.toggleClass);
        form.addEventListener("submit", this.handleFormInput);
    };
}

export { Form };
