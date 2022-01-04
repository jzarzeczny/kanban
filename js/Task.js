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

  createTaskCard() {
    // Create HTML elements
    const card = document.createElement("div");
    const cardHeader = document.createElement("h2");
    const cardPara = document.createElement("p");
    // Styling
    card.classList.add("list__card");
    cardHeader.classList.add("card__header");
    cardPara.classList.add("card__para");
    card.style.backgroundColor = this.color;
    // Attributes and content
    card.setAttribute("id", this.id);
    card.setAttribute("draggable", "true");
    card.setAttribute("ondragstart", this.onDragStart);
    cardHeader.innerHTML = this.header;
    cardPara.innerHTML = this.content;

    // Add the elements to card parent
    card.appendChild(cardHeader);
    card.appendChild(cardPara);

    // Add the card to TODO section
    return card;
  }
}

export default Task;
