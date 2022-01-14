import { Service } from "./Service.js";

interface UpdateItem {
    id: string;
    content: string;
    position?: string;
}

class Task {
    static onDragStart(ev: DragEvent) {
        const element = ev.target as HTMLElement;
        ev.dataTransfer?.setData("text/plain", element.id);
    }

    static editCard(event: Event) {
        const eventElement = event.target as HTMLElement;
        let id: string = "";
        if (eventElement.parentElement) {
            id = eventElement.parentElement.id;
        }
        const element = document.getElementById(id) as HTMLElement;
        const editableDiv = element?.children[1] as HTMLElement;
        editableDiv.onblur = () => {
            const service = new Service();
            const objToUpdate: UpdateItem = {
                id: element.id,
                content: element?.children[1].innerHTML,
            };
            service.updateItem(objToUpdate);
        };
    }

    static removeCard(event: Event): void {
        event.preventDefault();
        const service = new Service();
        const target = event.target as HTMLElement;
        const card = target.parentElement as HTMLElement;
        card?.parentElement?.removeChild(document.getElementById(card.id) as HTMLElement);
        service.delateItem(card.id);
    }
}

export { Task };
