interface NewTaskObject {
    header: string;
    content: string;
    color: string;
    position?: string;
}

interface TaskObject extends NewTaskObject {
    _id: string;
}

interface TaskEdit {
    id: string;
    content?: string;
    position?: string;
}

export { TaskObject, NewTaskObject, TaskEdit };
