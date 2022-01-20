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
    static createCategoryInput() {
        const target = document.querySelectorAll(".form__control")[1];
        target.insertAdjacentHTML(
            "afterend",
            `                                   <div id='category' class="form__control form__control--addCategory">
                  <label class="form__label form__label--addCategory" for="header">New category:</label>
                  <input class="form__input form__input--addCategory" type="text" id="newCategory" />
                  <input class="form__picker" type="color" id='newColor'/>
                  <button class='submit submit--addCategory' id='addCategory'>Add category</button>
<span class='form__error'></span>

               </div>
`
        );
    }
}

export { CategoryCreator };
