import { Container } from "../Container";
class ContainerCreator {
    createContainer(id: number, head: string) {
        const root = document.getElementById("root");
        const idString: string = id.toString();

        const list = document.createElement("div");
        list.classList.add("list");
        list.classList.add(`list--${head}`);

        const header = document.createElement("h2");
        header.classList.add("list__header");
        header.innerHTML = head.toUpperCase();

        const box = document.createElement("div");
        box.classList.add("list__container");
        box.setAttribute("id", idString);
        box.addEventListener("dragover", Container.onDragOver);
        box.addEventListener("drop", Container.onDrop);

        list.appendChild(header);
        list.appendChild(box);

        root?.appendChild(list);
    }
}

export { ContainerCreator };
