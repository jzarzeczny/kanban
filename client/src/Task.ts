import { Service } from "./Service";

interface UpdateItem{
    id: string;
    content: string;
    position: string;
}

interface DragEvent<T = Element> extends MouseEvent<T, DragEvent>{

}

class Task {
    static onDragStart(ev: DragEvent){
        ev.dataTransfer.setData("text/plain", ev.target.id) as DataTransfer
    }

    static editCard(event:) {
        event.preventDefault();
        const elementID = event.target.parentElement.id;
        const element = document.getElementById(elementID);
        const editableDiv:Element | undefined = element?.children[1]
        editableDiv.onblur = () => {
            const service = new Service();
            const objToUpdate:UpdateItem = {
                id: element?.id,
                content: element?.children[1].innerHTML,
            };
            service.updateItem(objToUpdate);
        }
    }

    static removeCard(event:Event):void {
        event.preventDefault();
        const service = new Service();
        const target = event.target as HTMLElement
        const card = target.parentElement as HTMLElement;
        card?.parentElement?.removeChild(document.getElementById(card.id));
        service.delateItem(card.id);
    }
}

export { Task };
