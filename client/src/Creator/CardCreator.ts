class CardCreator {
    createCardContainer(color: string, _id: string): HTMLDivElement {
        const card = document.createElement("div");
        card.classList.add("list__card");
        card.style.backgroundColor = color;
        card.setAttribute("id", _id);
        card.setAttribute("draggable", "true");
        return card;
    }
    createCardHeader(header: string): HTMLElement {
        const cardHeader = document.createElement("h2");
        cardHeader.classList.add("card__header");
        cardHeader.innerHTML = header;
        return cardHeader;
    }
    createCardContent(content: string): HTMLElement {
        const cardContent = document.createElement("div");
        cardContent.classList.add("card__para");
        cardContent.setAttribute("contenteditable", "true");
        cardContent.innerHTML = content;
        return cardContent;
    }
    createCardButton(): HTMLElement {
        const removeButton = document.createElement("button");
        removeButton.classList.add("card__button", "card_button--remove");
        removeButton.innerHTML = "Remove";
        return removeButton;
    }
    createCardInfo(): HTMLElement {
        const infoIcon = document.createElement("i");
        infoIcon.classList.add("card__icon");
        // Attributes and content

        infoIcon.innerHTML = "ℹ️";
        return infoIcon;
    }
    // Creator function that enables the construction of each element with proper listener, and then create the whole element
}

export { CardCreator };
