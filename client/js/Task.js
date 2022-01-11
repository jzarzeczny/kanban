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
      const elementID = event.target.parentElement.id;
      const element = document.getElementById(elementID);
      const editableDiv = element.children[1];
      editableDiv.onblur = () => {
         const storage = new Storage();
         const objToUpdate = {
            id: element.id,
            content: element.children[1].innerHTML,
         };
         storage.updateItem(objToUpdate);
      };
   }

   removeCard(event) {
      event.preventDefault();
      const storage = new Storage();
      const card = event.target.parentElement;
      card.parentElement.removeChild(document.getElementById(card.id));
      storage.delateItem(card.id);
   }
}

export default Task;
