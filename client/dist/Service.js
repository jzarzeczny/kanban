var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
class Service {
    // Singleton pattern implementation
    constructor() {
        if (Service._instance) {
            return Service._instance;
        }
        Service._instance = this;
    }
    static addItem(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            });
            const body = yield response.json();
            return body._id;
        });
    }
    static delateItem(taskID) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.url}${taskID}`, {
                method: "DELETE",
            });
            return response.json(); //Something is wrong with return value
        });
    }
    static getData() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetch(`${this.url}`)
                .then((response) => response.json())
                .then((data) => {
                return data;
            });
            return data;
        });
    }
}
_a = Service;
Service.url = "http://localhost:5002/mongo/";
Service.updateItem = (task) => __awaiter(void 0, void 0, void 0, function* () {
    const taskObject = {
        id: task.id,
        content: task.content,
        position: task.position,
    };
    const response = yield fetch(`${_a.url}${task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskObject),
    });
    return response.json();
});
export { Service };
