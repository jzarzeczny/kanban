// @ts-ignore
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
// require("@testing-library/jest-dom/extend-expect");
// require("jest-dom/extend-expect");

const html = fs.readFileSync(path.resolve(__dirname, "../", "index.html"));

let dom;
let container: any;

describe("test", () => {
    beforeEach(() => {
        dom = new JSDOM(html);
        container = dom.window.document.body;
    });
    it("Renders the root", () => {
        expect(container.querySelector("#root")).not.toBeNull();
    });
    it("Renders the columns", () => {
        expect(container.getElementById("1")).not.toBeNull();
    });
});
