import { UserView } from "./UserView";
import { UserLoginView } from "./UserLoginView";
import { UserRegisterView } from "./UserRegisterView";

class UserController {
    userView = new UserView();
    userLoginView = new UserLoginView();
    userRegisterView = new UserRegisterView();

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
        formElement.addEventListener("submit", this.validateOnSubmit);
    }

    buttonsAddEventListeners(): void {
        const buttons = document.querySelectorAll(".authorization__button");
        buttons.forEach((button): void => {
            button.addEventListener("click", this.switchToAnotherForm);
        });
    }

    validateOnSubmit(e: Event) {
        e.preventDefault();
    }

    init(): void {
        this.userView.createUserTemplate();
        this.userLoginView.createUserLogin();
        this.buttonsAddEventListeners();
    }
}

export { UserController };
