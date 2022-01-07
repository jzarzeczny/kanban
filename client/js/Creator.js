import Task from "./Task.js";
import Container from "./Container.js";

class Creator {
   task = new Task();
   container = new Container();
   createTaskCard(header, content, color, id, position) {
      // const card = `
      //    <div class='list__card' id=${this.id} draggable='true'>
      //       <h2 class="card__header">${this.header}</h2>
      //       <textarea class="card__para" disabled='true'>${this.para}</textarea>
      //       <div class="card__buttons">
      //       <button class="card__button card__button--edit">Edit</button>
      //       <button class="card__button card_button--remove">Remove</button>
      //       </div>
      //    </div>
      // `;
      // Create HTML elements
      const card = document.createElement("div");
      const cardHeader = document.createElement("h2");
      const cardPara = document.createElement("textarea");
      const cardButtons = document.createElement("div");
      const editButton = document.createElement("button");
      const removeButton = document.createElement("button");
      // Styling
      card.classList.add("list__card");
      cardHeader.classList.add("card__header");
      cardPara.classList.add("card__para");
      cardButtons.classList.add("card__buttons");
      editButton.classList.add("card__button", "card__button--edit");
      removeButton.classList.add("card__button", "card_button--remove");
      card.style.backgroundColor = color;
      // Attributes and content
      card.setAttribute("id", id);
      card.setAttribute("draggable", "true");
      card.addEventListener("dragstart", this.task.onDragStart);
      // cardPara.addEventListener("click", editCard);
      editButton.addEventListener("click", this.task.editCard);
      cardPara.setAttribute("disabled", "true");
      removeButton.addEventListener("click", this.task.removeCard);

      cardHeader.innerHTML = header;
      cardPara.innerHTML = content;
      editButton.innerHTML = "Edit";
      removeButton.innerHTML = "Remove";

      cardButtons.appendChild(editButton);
      cardButtons.appendChild(removeButton);
      // Add the elements to card parent
      card.appendChild(cardHeader);
      card.appendChild(cardPara);
      card.appendChild(cardButtons);

      // Add the card to TODO section
      return card;
   }
   createForm(target) {
      target.insertAdjacentHTML(
         "beforeend",
         `         <div class="add__container">
            <button id="openButton" class="add__open">+</button>
            <h2 class="add__header">Add item to list</h2>
            <form class="add__form" id="form">
               <div class="form__control">
                  <label class="form__label" for="header">Title</label>
                  <input class="form__input" type="text" id="header" />
               </div>
               <div class="form__control">
                  <label class="form__label" for="text">Content</label>
                  <textarea
                     class="form__input"
                     type="textarea"
                     id="text"></textarea>
               </div>
               <div class="form__control">
                  <p for="color">Select category</p>
                  <label class="radio"
                     >Category 1
                     <input
                        class="radio__input"
                        type="radio"
                        value="#D6D84F"
                        name="color" 
                              checked="checked"/>
                  
                     <span class="radio__box"></span>
                  </label>
                  <label class="radio"
                     >Category 2
                     <input
                        class="radio__input"
                        type="radio"
                        value="#DDC3D0"
                        name="color" />
                     <span class="radio__box"></span>
                  </label>
                  <label class="radio"
                     >Category 3
                     <input
                        class="radio__input"
                        type="radio"
                        value="#B3EFB2"
                        name="color" />
                     <span class="radio__box"></span>
                  </label>
               </div>
               <input type="submit" class="submit" value="Submit" />
            </form>
         </div>
`
      );
   }

   createContainer(id, head) {
      const root = document.getElementById("root");

      const list = document.createElement("div");
      list.classList.add("list");
      list.classList.add(`list--${head}`);

      const header = document.createElement("h2");
      header.classList.add("list__header");
      header.innerHTML = head.toUpperCase();

      const box = document.createElement("div");
      box.classList.add("list__container");
      box.setAttribute("id", id);
      box.addEventListener("dragover", this.container.onDragOver);
      box.addEventListener("drop", this.container.onDrop);

      list.appendChild(header);
      list.appendChild(box);

      root.appendChild(list);
   }
}

export default Creator;
