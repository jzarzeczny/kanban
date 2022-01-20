import { CategoryCreator } from "./Creator/CategoryCreator";
import { CategoryService } from "./Service/CategoryService";

class Category {
    name: string;
    id: string;
    color: string;

    constructor(name: string, id: string, color: string) {
        this.name = name;
        this.id = id;
        this.color = color;
    }

    categoryCreate() {
        const target = document.querySelector(".form__control--category") as HTMLElement;
        CategoryCreator.createCategory(target, this.id, this.name, this.color);
        const label = document.querySelector(`.radio--${this.id} span`) as HTMLElement;
        const button = document.querySelector(`.radio--${this.id} button`) as HTMLElement;
        button.addEventListener("click", this.removeCategory);
        label.style.backgroundColor = this.color;
    }

    removeNoCategoryIndicator() {
        const categoryError = document.querySelector("#category") as HTMLElement;
        categoryError.innerHTML = "";
    }

    removeCategory(this: HTMLElement, ev: MouseEvent) {
        ev.preventDefault();
        if (this.parentElement) {
            const categoryToDelete = this.parentElement as HTMLElement;
            const id: string = categoryToDelete.id;
            categoryToDelete.parentElement?.removeChild(categoryToDelete);

            CategoryService.deleteItem(id);
        }
    }
    static checkCategoryLength() {
        const categoriesArea = document.querySelector(".form__control--category") as HTMLElement;

        const config = { childList: true };

        const menageChangeOfElementList = (mutationsList: MutationRecord[]) => {
            mutationsList.forEach((mutation) => {
                if (mutation.type === "childList") {
                    const categoryInput = document.querySelector(
                        ".form__control--addCategory"
                    ) as HTMLElement;
                    // TODO: if length - 1 -> remove the indicator
                    if (categoriesArea.children.length >= 6) {
                        categoryInput.parentElement?.removeChild(categoryInput);
                    } else {
                        if (!categoryInput) {
                            CategoryCreator.createCategoryInput();
                        }
                    }
                }
            });
        };
        const observer = new MutationObserver(menageChangeOfElementList);
        observer.observe(categoriesArea, config);
    }
}

export { Category };
