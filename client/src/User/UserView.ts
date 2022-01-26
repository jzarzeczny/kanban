class UserView {
    userAuthRoot = document.querySelector(".authorization__container") as HTMLElement;

    createUserTemplate(): void {
        const documentRoot = document.getElementById("root") as HTMLElement;
        documentRoot.insertAdjacentHTML(
            "beforeend",
            `            <div class="authorization">
                <div class="authorization__container">
                    <div class="authorization__buttons">
                        <button class="authorization__button ">
                            Login
                        </button>
                        <button class="authorization__button authorization__button--nonactive">Register</button>
                    </div>

                </div>
            </div>`
        );
    }
    removeForm(): void {
        const formToBeRemoved = document.querySelector(
            ".authorization__container > form"
        ) as HTMLElement;
        formToBeRemoved.parentElement?.removeChild(formToBeRemoved);
    }

    displayErrorMessage(element: string, errorMessage: string): void {
        const elementToEvaluate = document.querySelector(`#${element}`) as HTMLInputElement;
        const elementToEvaluateError = elementToEvaluate.nextElementSibling as HTMLElement;
        elementToEvaluate.classList.add("form__input--error");
        elementToEvaluateError.innerHTML = errorMessage;
        this.onBlurWrongInput(elementToEvaluate, elementToEvaluateError);
    }

    onBlurWrongInput(element: HTMLInputElement, errorElement: HTMLElement): void {
        element.addEventListener("blur", () => {
            element.classList.remove("form__input--error");
            errorElement.innerHTML = "";
        });
    }
}

export { UserView };
