import { Task } from "../Task";

class CardCreator {
    static createTaskCard(
        header: string,
        content: string,
        color: string,
        _id: string
    ): HTMLDivElement {
        // Create HTML elements
        const card = document.createElement("div");
        const cardHeader = document.createElement("h2");
        const cardPara = document.createElement("div");
        const removeButton = document.createElement("button");
        const infoIcon = document.createElement("i");
        // Styling
        card.classList.add("list__card");
        cardHeader.classList.add("card__header");
        cardPara.classList.add("card__para");
        removeButton.classList.add("card__button", "card_button--remove");
        infoIcon.classList.add("card__icon");
        card.style.backgroundColor = color;
        // Attributes and content
        card.setAttribute("id", _id);
        card.setAttribute("draggable", "true");
        cardPara.setAttribute("contenteditable", "true");
        card.addEventListener("dragstart", Task.onDragStart);
        cardPara.addEventListener("click", Task.editTask);
        removeButton.addEventListener("click", Task.removeTask);
        infoIcon.addEventListener("mouseover", Task.showTaskInfo);
        infoIcon.addEventListener("mouseout", Task.removeTaskInfo);

        cardHeader.innerHTML = header;
        cardPara.innerHTML = content;
        removeButton.innerHTML = "Remove";
        infoIcon.innerHTML = "ℹ️";
        // Add the elements to card parent
        card.appendChild(cardHeader);
        card.appendChild(cardPara);
        card.appendChild(removeButton);
        card.appendChild(infoIcon);

        // Add the card to TODO section
        return card;
    }
}

export { CardCreator };
