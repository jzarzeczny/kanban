describe("Testing categories", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.wait(1000);

        cy.get(".add__open").click();
        cy.document().then((doc) => {
            const deleteButtons = doc.querySelectorAll(".radio__delete");
            for (let i = 0; i < deleteButtons.length; i++) {
                cy.get(".radio__delete").first().click();
            }
        });

        // const delCategoryButtons = document.querySelectorAll("radio__delete");
        // delCategoryButtons.forEach((button) => {});
    });
    it("Adds new categories", () => {
        const mockedCategory = [
            {
                name: "Category a",
                color: "#C2C5BB",
            },
            {
                name: "Category b",
                color: "#B5DDA4",
            },
            {
                name: "Category c",
                color: "#F9ECCC",
            },
            {
                name: "Category d",
                color: "#DDC9B4",
            },
            {
                name: "Category e",
                color: "#EB9FEF",
            },
        ];
        cy.wait(1000);

        mockedCategory.forEach((category) => {
            cy.get("#newCategory").clear();
            cy.get("#newCategory").type(category.name).should("have.value", category.name);
            cy.get("input[type=color]").invoke("val", category.color).trigger("change");
            cy.get("#addCategory").click();
        });

        cy.get(".form__control--category").find("span").should("have.length", 5);

        cy.document().then((doc) => {
            const deleteButtons = doc.querySelectorAll(".radio__delete");
            for (let i = 0; i < deleteButtons.length; i++) {
                cy.get(".radio__delete").first().click();
                cy.get(".form__control--category")
                    .find("span")
                    .should("have.length", 4 - i);
            }
        });
    });
    // When things go wrong
});
