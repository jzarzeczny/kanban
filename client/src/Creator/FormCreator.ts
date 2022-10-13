class FormCreator {
    createForm(target: HTMLElement): void {
        target.insertAdjacentHTML(
            "beforeend",
            `         <div class="add__container">
            <button id="openButton" class="add__open">+</button>
            <h2 class="add__header">Add item to list</h2>
            <form class="add__form" id="form">
               <div class="form__control">
                  <label class="form__label" for="header">Title:</label>
                  <input class="form__input" type="text" id="header" />
                  <span class='form__error'></span>
               </div>
               <div class="form__control">
                  <label class="form__label" for="text">Content:</label>
                  <textarea
                     class="form__input"
                     type="textarea"
                     id="text"></textarea>
                  <span class='form__error'></span>
                     
               </div>
               <div class="form__control form__control--category">
                  <p for="color">Select category:</p>
               </div>
          
               <input type="submit" class="submit submit--form" value="Submit" />
            </form>
         </div>
`
        );
    }
}

export { FormCreator };
