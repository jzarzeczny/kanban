interface Task {
    header: string;
    content: string;
    color: string;
    position: number;
}

interface Category {
    color: string;
    name: string;
}

export { Task, Category };
