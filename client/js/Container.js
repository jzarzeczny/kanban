class Container {
   constructor(id, header, updateThePositionOfTask) {
      this.id = id;
      this.header = header;
      this.updateThePositionOfTask = updateThePositionOfTask;
   }

   createTheContainer() {
      const list = document.createElement("div");
      list.classList.add("list");
      list.classList.add(`list--${this.header}`);
      return list;
   }

   createTheHeader() {
      const header = document.createElement("h2");
      header.classList.add("list__header");
      header.innerHTML = this.header.toUpperCase();
      return header;
   }

   createTheCardBox() {
      const box = document.createElement("div");
      box.classList.add("list__container");
      box.setAttribute("id", this.id);
      box.addEventListener("dragover", this.onDragOver);
      box.addEventListener("drop", this.onDrop);
      return box;
   }

   onDragOver(event) {
      event.preventDefault();
   }

   onDrop = (event) => {
      event.preventDefault();
      const id = event.dataTransfer.getData("text/plain");
      const draggableElement = document.getElementById(id);
      const dropzone = event.target;

      if (dropzone["classList"].contains("list__container")) {
         dropzone.appendChild(draggableElement);
         // Update the position of element in array
         this.updateThePositionOfTask(draggableElement, dropzone.id);
      }
   };

   createWholeContainer() {
      const container = this.createTheContainer();
      const header = this.createTheHeader();
      const cardBox = this.createTheCardBox();
      container.appendChild(header);
      container.appendChild(cardBox);
      return container;
   }
}

export default Container;
