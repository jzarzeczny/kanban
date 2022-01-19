class CategoryCreator {
    static createCategory(target: HTMLElement, id: string, name: string, color: string): void {
        target.insertAdjacentHTML(
            "beforeend",
            `        <label class="radio radio--${id}" id=${id}>
            ${name}
            <input
                class="radio__input"
                type="radio"
                value="${color}"
                name="color"
                checked="checked"
            />
            <button class="radio__delete">➖</button>
            <span class="radio__box"></span>
        </label>`
        );
    }
}

export { CategoryCreator };
