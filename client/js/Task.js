import Storage from "./Storage.js";

class Task {
   constructor(header, content, color, id, position) {
      this.header = header;
      this.content = content;
      this.color = color;
      this.id = id;
      this.position = position || 0;
   }

   onDragStart(event) {
      event.dataTransfer.setData("text/plain", event.target.id);
   }

   editCard(event) {
      event.preventDefault();
      const elementID = event.target.parentElement.parentElement.id;
      const element = document.getElementById(elementID);
      const textarea = element.children[1];
      textarea.removeAttribute("disabled");
      textarea.focus();
      textarea.onblur = () => {
         textarea.setAttribute("disabled", "true");
         const storage = new Storage();
         storage.updateValueLocalStorage(element);
         console.log(element);
      };
   }

   removeCard(event) {
      event.preventDefault();
      const storage = new Storage();
      const id = event.target.parentElement.parentElement.id;
      storage.delateItem(id);
   }

   createTaskCard() {
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
      card.style.backgroundColor = this.color;
      // Attributes and content
      card.setAttribute("id", this.id);
      card.setAttribute("draggable", "true");
      card.addEventListener("dragstart", this.onDragStart);
      editButton.addEventListener("click", this.editCard);
      cardPara.setAttribute("disabled", "true");
      removeButton.addEventListener("click", this.removeCard);

      cardHeader.innerHTML = this.header;
      cardPara.innerHTML = this.content;
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
}

export default Task;
