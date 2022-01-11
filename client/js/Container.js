import Storage from "./Storage.js";

class Container {
   constructor(id, header, updateThePositionOfTask) {
      this.id = id;
      this.header = header;
      this.updateThePositionOfTask = updateThePositionOfTask;
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
         draggableElement.position = dropzone.id;
         const store = new Storage();
         store.updateItem(draggableElement);
      }
   };
}

export default Container;
