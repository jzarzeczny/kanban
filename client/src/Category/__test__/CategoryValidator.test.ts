import { CategoryValidator } from "../CategoryValidator";

const documentBodyMock = () => {
    document.body.insertAdjacentHTML(
        "afterbegin",
        `
        <div id='root'>
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
        </div>
    `
    );
};

describe("Cateogry validator test", () => {
    it("Does not allow to add empty input", () => {
        documentBodyMock();

        const ableToAdd = CategoryValidator.validateCategoryName("");

        expect(ableToAdd).toBe(false);
    });

    // Those does not work
    //CategoryValidator:14 return undefined

    it("Allows to add unique string", () => {
        documentBodyMock();
        console.log(JSON.stringify(document.body, null, 4));
        const ableToAdd = CategoryValidator.validateCategoryName("unique");

        expect(ableToAdd).toBe(true);
    });

    // it("Does not allow to add non-unique string", () => {
    //     documentBodyMock();

    //     const ableToAdd = CategoryValidator.validateCategoryName("Test1");

    //     expect(ableToAdd).toBe(true);
    // });
});
