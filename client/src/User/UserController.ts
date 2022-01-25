import { UserView } from "./UserView";
import { UserLoginView } from "./UserLoginView";
import { UserRegisterView } from "./UserRegisterView";

class UserController {
    userView = new UserView();
    userLoginView = new UserLoginView();

    switchToAnotherForm(this: HTMLElement): void {
        const userView = new UserView();
        const userLoginView = new UserLoginView();
        const userRegisterView = new UserRegisterView();

        const buttonsList: NodeListOf<HTMLElement> =
            document.querySelectorAll(`.authorization__button`);
        const siblingButton: HTMLElement = Array.from(buttonsList).filter(
            (button) => button.classList.length === 1
        )[0];
        userView.removeForm();
        this.classList.remove("authorization__button--nonactive");
        siblingButton.classList.add("authorization__button--nonactive");

        this.setAttribute("disabled", "true");
        siblingButton.removeAttribute("disabled");
        if (this.textContent?.toLowerCase() === "register") {
            userRegisterView.createUserRegister();
        } else {
            userLoginView.createUserLogin();
        }
    }

    buttonsAddEventListeners(): void {
        const buttons = document.querySelectorAll(".authorization__button");
        buttons.forEach((button) => {
            button.addEventListener("click", this.switchToAnotherForm);
        });
    }

    init(): void {
        this.userView.createUserTemplate();
        this.userLoginView.createUserLogin();
        this.buttonsAddEventListeners();
    }
}

export { UserController };
