import { UserView } from "./UserView";
import { UserLoginView } from "./UserLoginView";
import { UserRegisterView } from "./UserRegisterView";
import { UserFormInput, UserFormErrors } from "../validators/userValidators";
import { UserModel } from "./UserModel";

class UserController {
    userView = new UserView();
    userLoginView = new UserLoginView();
    userRegisterView = new UserRegisterView();
    userModel = new UserModel();

    switchToAnotherForm = (): void => {
        // Arrow function to get rid of this -> solution
        const userView = new UserView();
        const targetButton = document.querySelector(
            ".authorization__button--nonactive"
        ) as HTMLElement;
        const buttonsList: NodeListOf<HTMLElement> =
            document.querySelectorAll(`.authorization__button`);
        const siblingButton: HTMLElement = Array.from(buttonsList).filter(
            (button) => button.classList.length === 1
        )[0];
        userView.removeForm();
        targetButton.classList.remove("authorization__button--nonactive");
        siblingButton.classList.add("authorization__button--nonactive");

        targetButton.setAttribute("disabled", "true");
        siblingButton.removeAttribute("disabled");
        this.switchViewForm(targetButton.textContent as string);
    };
    // .bind() // .apply()

    switchViewForm(type: string): void {
        let formElement: HTMLElement;
        if (type.toLowerCase() === "register") {
            formElement = this.userRegisterView.createUserRegister();
        } else {
            formElement = this.userLoginView.createUserLogin();
        }
        formElement.addEventListener("submit", this.getDataOnSubmit);
    }

    buttonsAddEventListeners(): void {
        const buttons = document.querySelectorAll(".authorization__button");
        buttons.forEach((button): void => {
            button.addEventListener("click", this.switchToAnotherForm);
        });
    }

    getDataOnSubmit = (e: SubmitEvent): void => {
        e.preventDefault();
        const submitType = (e.submitter as HTMLInputElement).value;
        const userFormElement = e.target as HTMLFormElement;
        let userFormInputData: any;
        if (submitType.toLowerCase() === "register") {
            userFormInputData = {
                user: (userFormElement[0] as HTMLInputElement).value,
                password: (userFormElement[1] as HTMLInputElement).value,
                password2: (userFormElement[2] as HTMLInputElement).value,
            };
        } else if (submitType.toLowerCase() === "login") {
            userFormInputData = {
                user: (userFormElement[0] as HTMLInputElement).value,
                password: (userFormElement[1] as HTMLInputElement).value,
            };
        }
        this.validateDataOnSubmit(userFormInputData);
    };

    validateDataOnSubmit(userFormInputData: UserFormInput) {
        const error: any = new Object();
        if (userFormInputData.user === "") {
            error.user = {
                message: "Provide a username",
            };
            // Case to cover later:
            // - username taken
            // - length
        }
        if (userFormInputData.password === "") {
            error.password = {
                message: "Provide a password",
            };
        }
        if (userFormInputData.password2 === "") {
            error.password2 = {
                message: "Confirm password",
            };
        }
        if (
            userFormInputData.password2 &&
            userFormInputData.password !== userFormInputData.password2
        ) {
            error.password = {
                message: "Password must much",
            };
            error.password2 = {
                message: "Password must much",
            };
        }
        if (Object.keys(error).length === 0) {
            this.userModel.submitTheUserForm(userFormInputData);
        } else this.displayErrorMessage(error);
    }

    displayErrorMessage(errors: UserFormErrors): void {
        for (const [error, value] of Object.entries(errors)) {
            const message: string = value.message;
            this.userView.displayErrorMessage(error, message);
        }
    }

    init(): void {
        this.userView.createUserTemplate();
        const formElement = this.userLoginView.createUserLogin();
        formElement.addEventListener("submit", this.getDataOnSubmit);
        this.buttonsAddEventListeners();
    }
}

export { UserController };
