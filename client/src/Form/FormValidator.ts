export interface FormError {
    type: string;
    id: string;
    error: boolean;
    message: string;
}

class FormValidator {
    validateTitle(): FormError {
        const titleInput = document.getElementById("header") as HTMLInputElement;
        if (titleInput.value.trim() === "") {
            return {
                type: "text",
                id: "header",
                error: true,
                message: "Provide title content",
            };
        } else {
            return { type: "title", id: "header", message: "", error: false };
        }
    }
    validateContent(): FormError {
        const contentInput = document.getElementById("text") as HTMLInputElement;
        if (contentInput.value.trim() === "") {
            return {
                type: "text",
                id: "text",
                error: true,
                message: "Provide task content",
            };
        } else {
            return { type: "content", id: "text", message: "", error: false };
        }
    }
    validateCategories(): FormError {
        const categoryArea = document.querySelector(".form__control--category") as HTMLElement;
        if (categoryArea.children.length < 2) {
            return {
                type: "categories",
                id: "category",
                error: true,
                message: "Create category first",
            };
        } else {
            return { type: "categories", id: "category", message: "", error: false };
        }
    }

    evaluate(formField: FormError) {
        if (formField.type === "text") {
            const inputElement = document.getElementById(formField.id) as HTMLInputElement;
            const inputElementError = inputElement.nextElementSibling as HTMLElement;
            inputElement.classList.add("form__input--error");
            inputElementError.innerHTML = formField.message;
        }
        if (formField.type === "categories") {
            const categoryError = document.querySelector(
                `#${formField.id} .form__error`
            ) as HTMLElement;
            categoryError.innerHTML = formField.message;
        }
    }
}

export { FormValidator };
