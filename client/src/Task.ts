import { Service } from "./Service";

class Task {
    static onDragStart(event: DragEvent<HTMLDivElement>) {
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    static editCard(event:) {
        event.preventDefault();
        const elementID = event.target.parentElement.id;
        const element = document.getElementById(elementID);
        const editableDiv = element.children[1];
        editableDiv.onblur = () => {
            const service = new Service();
            const objToUpdate = {
                id: element.id,
                content: element.children[1].innerHTML,
            };
            service.updateItem(objToUpdate);
        };
    }

    static removeCard(event) {
        event.preventDefault();
        const service = new Service();
        const card = event.target.parentElement;
        card.parentElement.removeChild(document.getElementById(card.id));
        service.delateItem(card.id);
    }
}

export { Task };
