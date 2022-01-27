import { CategoryValidator } from "../CategoryValidator";
// import { CategoryCreator } from "../../Creator/CategoryCreator";
import { JSDOM } from "jsdom";
import * as fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "../../", "index.html"));

let document: any;

let dom;
describe("Category validator test", () => {
    beforeEach(() => {
        dom = new JSDOM(html);
        global.document = dom.window.document;
        document = dom.window.document;
        const root = document.querySelector("#root");
        root?.insertAdjacentHTML(
            "beforeend",
            `     <div id='root'>
        <label class="radio radio--1234" id=1234>
            Test1
            <input
                class="radio__input"
                type="radio"
                value="#fff"
                name="color"
                checked="checked"
            />
            <button class="radio__delete">➖</button>
            <span class="radio__box"></span>
        </label>
          <label class="radio radio--2345" id=1234>
            Test2
            <input
                class="radio__input"
                type="radio"
                value="#fff"
                name="color"
                checked="checked"
            />
            <button class="radio__delete">➖</button>
            <span class="radio__box"></span>
        </label>
        </div>`
        );
    });

    it("Does not allow to add empty input", () => {
        const ableToAdd = CategoryValidator.validateCategoryName("");

        expect(ableToAdd).toBe(false);
    });

    // Those does not work
    //CategoryValidator:14 return undefined

    it("Allows to add unique string", () => {
        const ableToAdd = CategoryValidator.validateCategoryName("unique");

        expect(ableToAdd).toBe(true);
    });

    // it("Does not allow to add non-unique string", () => {
    //     documentBodyMock();

    //     const ableToAdd = CategoryValidator.validateCategoryName("Test1");

    //     expect(ableToAdd).toBe(true);
    // });
});
