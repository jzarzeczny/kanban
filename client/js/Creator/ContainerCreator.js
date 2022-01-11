import Container from "../Container.js";
class ContainerCreator {
   container = new Container();

   createContainer(id, head) {
      const root = document.getElementById("root");

      const list = document.createElement("div");
      list.classList.add("list");
      list.classList.add(`list--${head}`);

      const header = document.createElement("h2");
      header.classList.add("list__header");
      header.innerHTML = head.toUpperCase();

      const box = document.createElement("div");
      box.classList.add("list__container");
      box.setAttribute("id", id);
      box.addEventListener("dragover", this.container.onDragOver);
      box.addEventListener("drop", this.container.onDrop);

      list.appendChild(header);
      list.appendChild(box);

      root.appendChild(list);
   }
}

export default ContainerCreator;
