import { CategoryCreator } from "./Creator/CategoryCreator";

import { Service } from "./Service/Service";
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

    removeCategory(this: HTMLElement, ev: MouseEvent) {
        ev.preventDefault();
        if (this.parentElement) {
            const categoryToDelete = this.parentElement as HTMLElement;
            const id: string = categoryToDelete.id;
            categoryToDelete.parentElement?.removeChild(categoryToDelete);

            Service.deleteItem(id, "category/");
        }
    }
}

export { Category };
