class ContainerCreator {
    static createContainer(id: string, head: string): void {
        const root = document.getElementById("root") as HTMLElement;

        const list = document.createElement("div") as HTMLDivElement;
        list.classList.add("list");
        list.classList.add(`list--${id}`);

        const header = document.createElement("h2") as HTMLElement;
        header.innerHTML = head.toUpperCase();
        header.classList.add("header__title");

        const headerDiv = document.createElement("div") as HTMLDivElement;
        headerDiv.classList.add("list__header");

        const counter = document.createElement("div") as HTMLDivElement;
        counter.classList.add("header__counter");

        const number = document.createElement("span") as HTMLElement;
        number.classList.add("header__number");
        number.innerHTML = "0";

        counter.appendChild(number);

        headerDiv.appendChild(header);
        headerDiv.appendChild(counter);

        const box = document.createElement("div") as HTMLDivElement;
        box.classList.add("list__container");
        box.setAttribute("id", id);

        list.appendChild(headerDiv);
        list.appendChild(box);

        root?.appendChild(list);
    }
}

export { ContainerCreator };
