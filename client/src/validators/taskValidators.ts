interface NewTaskObject {
    header: string;
    content: string;
    color: string;
    position?: string;
}

interface TaskObject extends NewTaskObject {
    _id: string;
    editList: TaskInfo[];
}

interface TaskEdit {
    id: string;
    content?: string;
    position?: string;
}

interface TaskInfo {
    author: string;
    change: string;
    time: number;
}

export { TaskObject, NewTaskObject, TaskEdit, TaskInfo };
