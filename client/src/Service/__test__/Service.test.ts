import { TaskService } from "../TaskService";

global.fetch = jest.fn(
    (): Promise<any> =>
        Promise.resolve({
            json: () => Promise.resolve([]),
        })
);

describe("TaskService", () => {
    beforeEach(() => {
        //@ts-ignore
        fetch.mockClear() as any;
    });
    it("Gives response for GET request ", async () => {
        const data = await TaskService.getData();
        expect(fetch).toHaveBeenCalledWith("http://localhost:5002/mongo/");
        expect(fetch).toBeCalled();
        expect(data.length).toEqual(0);
    });
    it("Gives response for POST request ", async () => {
        const data = await TaskService.addItem({});
        expect(fetch).toHaveBeenCalledWith("http://localhost:5002/mongo/", {
            body: "{}",
            headers: { "Content-Type": "application/json" },
            method: "POST",
        });
        expect(fetch).toBeCalled();
        console.log(data);
    });
    it("Gives response for DELETE request ", async () => {
        const data = await TaskService.deleteItem("1234");
        expect(fetch).toHaveBeenCalledWith("http://localhost:5002/mongo/1234", {
            method: "DELETE",
        });
        expect(fetch).toBeCalledTimes(1);
        console.log(data);
    });
    // it("Gives response for PUT request ", async () => {
    //     const data = await TaskService.updateItem("1234");
    //     expect(fetch).toHaveBeenCalledWith("http://localhost:5002/mongo/1234", {
    //         body: "{}",
    //         headers: { "Content-Type": "application/json" },
    //         method: "PUT",
    //     });
    //     expect(fetch).toBeCalledTimes(1);
    //     console.log(data);
    // });
});
