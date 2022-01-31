abstract class Service {
    static get url(): string {
        return "";
    }

    static async addItem(item: any): Promise<string> {
        const response = await fetch(`${this.url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });
        const body = await response.json();
        return body._id;
    }
    static async deleteItem(itemID: string) {
        await fetch(`${this.url}${itemID}`, {
            method: "DELETE",
        });
    }
    static async updateItem(item: any) {
        const taskObject = {
            id: item._id,
            content: item.content,
            position: item.position,
            editList: item.editList,
        };
        await fetch(`${this.url}${item._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskObject),
        });
    }

    static async getData(): Promise<any> {
        const data = await fetch(`${this.url}`)
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
        return data;
    }
}

export { Service };
