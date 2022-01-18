import { Service } from "./Service";
import { TaskEdit } from "./validators/taskValidators";

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
        editableDiv.onblur = (): void => {
            const objToUpdate: TaskEdit = {
                id: element.id,
                content: element?.children[1].innerHTML,
            };
            Service.updateItem(objToUpdate);
        };
    }

    static removeCard(event: Event) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const card = target.parentElement as HTMLElement;
        card?.parentElement?.removeChild(document.getElementById(card.id) as HTMLElement);
        Service.delateItem(card.id);
    }
}

export { Task };
