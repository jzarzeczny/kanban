import { CategoryCreator } from "./Creator/CategoryCreator";
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
        label.style.backgroundColor = this.color;
    }

    removeCategory() {
        // TODO, remove category
    }

    addEventListener() {
        // Event listeners
    }
}

export { Category };
