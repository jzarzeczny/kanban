class FormCreator {
    createForm(target) {
        target.insertAdjacentHTML("beforeend", `         <div class="add__container">
            <button id="openButton" class="add__open">+</button>
            <h2 class="add__header">Add item to list</h2>
            <form class="add__form" id="form">
               <div class="form__control">
                  <label class="form__label" for="header">Title:</label>
                  <input class="form__input" type="text" id="header" />
               </div>
               <div class="form__control">
                  <label class="form__label" for="text">Content:</label>
                  <textarea
                     class="form__input"
                     type="textarea"
                     id="text"></textarea>
               </div>
               <div class="form__control">
                  <p for="color">Select category:</p>
                  <label class="radio"
                     >Category 1
                     <input
                        class="radio__input"
                        type="radio"
                        value="#fdff7b"
                        name="color" 
                              checked="checked"/>
                  
                     <span class="radio__box"></span>
                  </label>
                  <label class="radio"
                     >Category 2
                     <input
                        class="radio__input"
                        type="radio"
                        value="#fcb7da"
                        name="color" />
                     <span class="radio__box"></span>
                  </label>
                  <label class="radio"
                     >Category 3
                     <input
                        class="radio__input"
                        type="radio"
                        value="#99fa97"
                        name="color" />
                     <span class="radio__box"></span>
                  </label>
               </div>
               <input type="submit" class="submit" value="Submit" />
            </form>
         </div>
`);
    }
}
export { FormCreator };
