class Container {
  constructor(id, header) {
    this.id = id;
    this.header = header;
  }
  createTheContainer() {
    const list = document.createElement("div");
    list.classList.add("list");
    list.classList.add(`list--${header.toUpperCase()}`);
    return list;
  }

  createTheHeader() {
    const header = document.createElement("h2");
    header.classList.add("list__header");
    header.innerHTML = this.header;
    return header;
  }

  createTheCardBox() {
    const box = document.createElement("div");
    box.classList.add("list__container");
    return box;
  }

  onDragOver(event) {
    event.preventDefault();
  }
  onDrop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    if (dropzone["classList"].contains("list__container")) {
      dropzone.appendChild(draggableElement);
      const t = getElementFromMainArray(id);
    }
  }
  createWholeContainer() {
    const container = this.createTheContainer();
    const header = this.createTheHeader();
    const cardBox = this.createTheCardBox();
    cardBox.setAttribute("ondragover", this.onDragOver);
    cardBox.setAttribute("ondrop", this.onDrop);
    container.appendChild(header);
    container.appendChild(cardBox);
    return container;
  }
}

export default Container;
