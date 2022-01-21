import { CategoryCreator } from "../Creator/CategoryCreator";
import { CategoryService } from "../Service/CategoryService";
import { CategoryValidator } from "../Category/CategoryValidator";
import { NewCategoryObject, CategoryObject } from "../validators/categoryValidators";

class Category {
    name: string;
    id: string;
    color: string;

    constructor(name: string, id: string, color: string) {
        this.name = name;
        this.id = id;
        this.color = color;
    }

    static async addCategory(color: string, name: string): Promise<void> {
        const canAddCategory = CategoryValidator.validateCategoryName(name);
        if (canAddCategory === false) return;
        const newCategoryObject: NewCategoryObject = { color: color, name: name };
        const id: string = await CategoryService.addItem(newCategoryObject);
        const categoryObject: CategoryObject = { ...newCategoryObject, _id: id };
        const category = new Category(
            categoryObject.name,
            categoryObject._id,
            categoryObject.color
        );
        category.categoryCreate();
    }

    static handleCategoryInput(this: HTMLElement, ev: MouseEvent): void {
        ev.preventDefault();

        const nameInput = document.getElementById("newCategory") as HTMLInputElement;
        const colorInput = document.getElementById("newColor") as HTMLInputElement;

        Category.addCategory(colorInput.value, nameInput.value);
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
                    const categoryError = document.querySelector(
                        "#category .form__error"
                    ) as HTMLElement;

                    if (categoriesArea.children.length === 2) {
                        categoryError.innerHTML = "";
                    }
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

    static bindEvents() {
        const addCategoryButton = document.getElementById("addCategory") as HTMLElement;
        addCategoryButton.addEventListener("click", Category.handleCategoryInput);
    }
}

export { Category };
