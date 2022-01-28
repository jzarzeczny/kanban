import { CardCreator } from "./Creator/TaskCreator";
import { TaskService } from "./Service/TaskService";
import { TaskEdit, TaskObject, TaskInfo } from "./validators/taskValidators";
import { CardInfoCreator } from "./Creator/TaskInfoCreator";

class Task {
    header: string;
    content: string;
    color: string;
    author: string;
    position: string;
    _id: string;
    editList: TaskInfo[];
    currentUser: string;
    constructor(taskData: TaskObject, currentUser: string) {
        this.header = taskData.header;
        this.content = taskData.content;
        this.color = taskData.color;
        this.author = taskData.author;
        this.position = taskData.position || "0";
        this._id = taskData._id || "";
        this.editList = taskData.editList;
        this.currentUser = currentUser;
    }

    cardCreator = new CardCreator();

    async addTask(fresh: boolean = false): Promise<void> {
        const taskObject = this.createTaskObject();
        if (fresh) {
            const newId = await TaskService.addItem(taskObject);
            this._id = newId;
            taskObject._id = newId;
        }
        const taskElement: HTMLElement = this.createTaskElement();

        this.addTaskToContainer(taskElement);
    }

    private createTaskElement(): HTMLElement {
        const cardContainer = this.cardCreator.createTaskContainer(this.color, this._id);
        cardContainer.addEventListener("dragstart", this.onDragStart);

        const cardHeader = this.cardCreator.createTaskHeader(this.header);
        const cardContent = this.cardCreator.createTaskContent(this.content);
        cardContent.addEventListener("click", this.editTask);
        const cardButton = this.cardCreator.createTaskButton();
        cardButton.addEventListener("click", this.removeTask);

        const cardInfo = this.cardCreator.createTaskInfo();
        cardInfo.addEventListener("mouseover", this.showTaskInfo);
        cardInfo.addEventListener("mouseout", this.removeTaskInfo);

        const cardAuthor = this.cardCreator.createTaskAuthor(this.author);

        cardContainer.appendChild(cardHeader);
        cardContainer.appendChild(cardContent);
        cardContainer.appendChild(cardAuthor);
        cardContainer.appendChild(cardButton);
        cardContainer.appendChild(cardInfo);

        // Add the card to TODO section
        return cardContainer;
    }

    private createTaskObject(): TaskObject {
        const taskObject = {
            header: this.header,
            content: this.content,
            color: this.color,
            author: this.author,
            _id: this._id,
            editList: this.editList,
        };
        return taskObject;
    }
    private addTaskToContainer(taskElement: HTMLElement) {
        const properContainer = document.getElementById(this.position) as HTMLElement;
        if (properContainer) {
            properContainer.appendChild(taskElement);
        }
    }

    editTask = (event: Event) => {
        const eventElement = event.target as HTMLElement;
        let _id: string = "";
        if (eventElement.parentElement) {
            _id = eventElement.parentElement.id;
        }
        const taskElement = document.getElementById(_id) as HTMLElement;
        const editableDiv = taskElement.children[1] as HTMLElement;

        editableDiv.blur = this.onBlurHandler(taskElement);
    };
    private onBlurHandler = (taskElement: HTMLElement): any => {
        const newContent = taskElement.children[1].innerHTML;
        const newEditList = [
            ...this.editList,
            {
                author: this.currentUser,
                change: newContent,
                time: Date.now(),
            },
        ];
        const taskObject: TaskEdit = {
            _id: taskElement.id,
            content: newContent,
            editList: newEditList,
        };
        this.editList = newEditList;
        TaskService.updateItem(taskObject);
        // TODO:
        // Blur does not have current element, it has old one. Need to grab it once again.
    };

    set editListOfTask(editList: TaskInfo[]) {
        this.editList = editList;
    }

    removeTask(event: Event) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const card = target.parentElement as HTMLElement;
        card?.parentElement?.removeChild(document.getElementById(card.id) as HTMLElement);
        TaskService.deleteItem(card.id);
    }

    private onDragStart(ev: DragEvent) {
        const element = ev.target as HTMLElement;
        ev.dataTransfer?.setData("text/plain", element.id);
    }

    private showTaskInfo = (event: MouseEvent): void => {
        const taskId: string = (event.relatedTarget as HTMLElement).id;
        if (taskId && this.editList.length > 0) {
            CardInfoCreator.createTaskInfo(taskId);
            this.editList.forEach((singleEditInformation: TaskInfo) => {
                CardInfoCreator.createTaskSingleInfo(taskId, singleEditInformation);
            });
        }
    };
    private removeTaskInfo(event: MouseEvent): void {
        const taskId: string = (event.relatedTarget as HTMLElement).id;
        if (taskId) {
            CardInfoCreator.removeTaskInfo(taskId);
        }
    }
}

export { Task };
