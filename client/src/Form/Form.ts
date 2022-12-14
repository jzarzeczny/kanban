import { NewTaskObject, TaskInfo, TaskObject } from "../validators/taskValidators";
import { Task } from "../Task";
import { FormValidator, FormError } from "./FormValidator";
import { UserController } from "../User/UserController";
import { FormCreator } from "../Creator/FormCreator";

class Form {
    userController = new UserController();
    formCreator = new FormCreator();

    _user: string = "";

    handleFormInput = (ev: SubmitEvent): void => {
        if (ev.submitter && ev.submitter.classList.contains("submit--form")) {
            ev.preventDefault();
            const error = Form.validateFormInput();
            if (error) return;
            const inputElement = ev.target as HTMLFormElement;

            const taskObject = this.createInputObject(inputElement);

            const task = new Task(taskObject, this._user);

            task.addTask(true);
            const form = document.getElementById("form") as HTMLFormElement;

            form.parentElement?.classList.toggle("add__container--open");
            FormValidator.resetEvaluation();

            form.reset();
        }
    };

    createInputObject(inputElement: HTMLFormElement): TaskObject {
        const initialTaskObject = this.getDataFromInput(inputElement);
        const editInfo: TaskInfo = {
            author: this._user,
            change: initialTaskObject.content,
            time: Date.now(),
        };
        const finalTaskObject: TaskObject = {
            ...initialTaskObject,
            _id: "",
            editList: [],
        };
        finalTaskObject.editList.push(editInfo);
        return finalTaskObject;
    }

    private getDataFromInput(formElement: HTMLFormElement): NewTaskObject {
        const header: string = (formElement[0] as HTMLInputElement).value;
        const content: string = (formElement[1] as HTMLInputElement).value;
        const color: string = (
            document.querySelector("input[name='color']:checked") as HTMLInputElement
        ).value;
        return {
            header: header,
            content: content,
            color: color,
            author: this._user,
        };
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

    createForm(target: HTMLElement) {
        this.formCreator.createForm(target);
    }

    set userName(user: string) {
        this._user = user;
    }
}

export { Form };
