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
      };
   }

   removeCard(event) {
      event.preventDefault();
      const storage = new Storage();
      const id = event.target.parentElement.parentElement.id;
      storage.delateItem(id);
   }
}

export default Task;
