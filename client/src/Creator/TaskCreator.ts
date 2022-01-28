class TaskCreator {
    createTaskContainer(color: string, _id: string): HTMLDivElement {
        const card = document.createElement("div");
        card.classList.add("list__card");
        card.style.backgroundColor = color;
        card.setAttribute("id", _id);
        card.setAttribute("draggable", "true");
        return card;
    }
    createTaskHeader(header: string): HTMLElement {
        const cardHeader = document.createElement("h2");
        cardHeader.classList.add("card__header");
        cardHeader.innerHTML = header;
        return cardHeader;
    }
    createTaskContent(content: string): HTMLElement {
        const cardContent = document.createElement("div");
        cardContent.classList.add("card__para");
        cardContent.setAttribute("contenteditable", "true");
        cardContent.innerHTML = content;
        return cardContent;
    }
    createTaskButton(): HTMLElement {
        const removeButton = document.createElement("button");
        removeButton.classList.add("card__button", "card_button--remove");
        removeButton.innerHTML = "Remove";
        return removeButton;
    }
    createTaskInfo(): HTMLElement {
        const infoIcon = document.createElement("i");
        infoIcon.classList.add("card__icon");
        // Attributes and content

        infoIcon.innerHTML = "ℹ️";
        return infoIcon;
    }
    createTaskAuthor(author: string): HTMLElement {
        const authorInformation = document.createElement("p");
        authorInformation.classList.add("card__author");
        authorInformation.innerHTML = "@" + author;
        return authorInformation;
    }
    // Creator function that enables the construction of each element with proper listener, and then create the whole element
}

export { TaskCreator as CardCreator };
