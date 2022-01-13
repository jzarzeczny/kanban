import { Task } from "../Task";

class CardCreator {
    createTaskCard(header: string, content: string, color: string, id?: string) {
        // Create HTML elements
        const card = document.createElement("div");
        const cardHeader = document.createElement("h2");
        const cardPara = document.createElement("div");
        const removeButton = document.createElement("button");
        // Styling
        card.classList.add("list__card");
        cardHeader.classList.add("card__header");
        cardPara.classList.add("card__para");
        removeButton.classList.add("card__button", "card_button--remove");
        card.style.backgroundColor = color;
        // Attributes and content
        card.setAttribute("id", id);
        card.setAttribute("draggable", "true");
        cardPara.setAttribute("contenteditable", "true");
        card.addEventListener("dragstart", Task.onDragStart);
        cardPara.addEventListener("click", Task.editCard);
        removeButton.addEventListener("click", Task.removeCard);

        cardHeader.innerHTML = header;
        cardPara.innerHTML = content;
        removeButton.innerHTML = "Remove";

        // Add the elements to card parent
        card.appendChild(cardHeader);
        card.appendChild(cardPara);
        card.appendChild(removeButton);

        // Add the card to TODO section
        return card;
    }
}

export { CardCreator };
