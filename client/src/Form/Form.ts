import { TaskService } from "../Service/TaskService";
import { CardCreator } from "../Creator/CardCreator";
import { TaskObject } from "../validators/taskValidators";
import { FormValidator, FormError } from "./FormValidator";

class Form {
    cardCreator = new CardCreator();

    static async addTask(task: TaskObject, fresh: boolean = false): Promise<void> {
        let _id: string = task._id;
        if (fresh) {
            _id = await TaskService.addItem(task);
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

    handleFormInput(this: HTMLFormElement, ev: SubmitEvent): void {
        if (ev.submitter && ev.submitter.classList.contains("submit--form")) {
            ev.preventDefault();
            const error = Form.validateFormInput();
            if (error) return;
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

            form.parentElement?.classList.toggle("add__container--open");
            FormValidator.resetEvaluation();

            form.reset();
        }
    }

    static validateFormInput(): boolean {
        const formValidator = new FormValidator();
        let formErrorObject: FormError[] = [];
        formErrorObject.push(formValidator.validateTitle());
        formErrorObject.push(formValidator.validateContent());
        formErrorObject.push(formValidator.validateCategories());
        formErrorObject.forEach((formField) => {
            formValidator.evaluate(formField);
        });
        const errors = formErrorObject.filter((error) => error.error === true);

        if (errors.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    onBlur(this: HTMLInputElement): void {
        if (this.value.trim() !== "") {
            this.classList.remove("form__input--error");
            this.classList.add("form__input--success");
            (this.nextElementSibling as HTMLElement).innerHTML = "";
        }
    }

    toggleClass(this: HTMLElement): void {
        this.parentElement?.classList.toggle("add__container--open");
    }

    bindEvents = (): void => {
        const button = document.getElementById("openButton") as HTMLElement;
        const form = document.getElementById("form") as HTMLFormElement;
        const headerInput = document.getElementById("header") as HTMLInputElement;
        const contentInput = document.getElementById("text") as HTMLInputElement;

        headerInput.addEventListener("blur", this.onBlur);
        contentInput.addEventListener("blur", this.onBlur);
        button.addEventListener("click", this.toggleClass);
        form.addEventListener("submit", this.handleFormInput);
    };
}

export { Form };
