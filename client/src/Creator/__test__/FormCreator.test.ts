// @ts-ignore
const testing = require("@testing-library/dom");
const jsdom = require("jsdom");
const fs = require("fs");
const path = require("path");
// const events = require("@testing-library/user-event");
// import { getByText, fireEvent } from "@testing-library/dom";
// import "jest-dom/extend-expect";
const { JSDOM } = jsdom;
import { FormCreator } from "../FormCreator";

const html = fs.readFileSync(path.resolve(__dirname, "../../", "index.html"));

let dom;
let container: any;

describe("Form Creator", () => {
    beforeEach(() => {
        dom = new JSDOM(html);
        container = dom.window.document;
        const root = container.querySelector("#root");
        const form = new FormCreator();
        form.createForm(root);
    });
    it("Renders the form", () => {
        expect(container.querySelector(".add__container")).not.toBeNull();
        expect(testing.getByText(container, "Add item to list")).not.toBeNull();
        expect(testing.getByText(container, "Submit")).not.toBeNull();
    });
    it("Correctly shows the form error", () => {
        const submitButton = container.querySelector(".submit--form");
        submitButton.click();
        const errorsElement = container.querySelectorAll(".form__error");
        expect(errorsElement.length).toBe(2);
        expect(errorsElement[0].innerHTML).toBe("Provide title content");
        expect(errorsElement[1].innerHTML).toBe("Provide task content");
    });
});
