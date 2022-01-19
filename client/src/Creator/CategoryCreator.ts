class CateogryCreator {
    static createCategory(target: HTMLElement, id: string, color: string, name: string): void {
        target.insertAdjacentHTML(
            "beforeend",
            `        <label class="radio radio--${id}">
            ${name}
            <input
                class="radio__input"
                type="radio"
                value="${color}"
                name="color"
                checked="checked"
            />
            <span class="radio__box"></span>
        </label>`
        );
    }
}
