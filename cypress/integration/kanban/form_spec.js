describe("Testing drag and drop", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5002");
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
    it("Opens the form", () => {
        cy.get(".add__container").should("have.class", "add__container--open");
    });
    // When things go wrong

    it("Checking the correct error message", () => {
        cy.wait(1000);

        cy.get(".add__container").should("have.class", "add__container--open");

        cy.get(".submit--form").click();
        cy.get("#header").should("have.class", "form__input--error");
        cy.get("#header ~ span").should("have.text", "Provide title content");
        cy.get("#text").should("have.class", "form__input--error");
        cy.get("#text ~ span").should("have.text", "Provide task content");

        cy.get("#category > span").should("have.text", "Create category first");
    });
    it("Input change the errors into correct class", () => {
        cy.wait(1000);

        cy.get(".add__container").should("have.class", "add__container--open");

        cy.get(".submit--form").click();

        cy.get("#header").should("have.class", "form__input--error");
        cy.get("#header ~ span").should("have.text", "Provide title content");

        cy.get("#text").should("have.class", "form__input--error");
        cy.get("#text ~ span").should("have.text", "Provide task content");

        cy.get("#category > span").should("have.text", "Create category first");

        // Make an input to test once the textarea class change occurs
        cy.get("#header")
            .type("Task 1")
            .blur()
            .should("have.value", "Task 1")
            .should("have.class", "form__input--success");
        cy.get("#text")
            .type("lorem ipsum dori")
            .blur()
            .should("have.value", "lorem ipsum dori")
            .should("have.class", "form__input--success");
        cy.get("#newCategory").type("Category 1").should("have.value", "Category 1");
        cy.get("input[type=color]").invoke("val", "#8AE1FC").trigger("change");
        cy.get("#addCategory").click();
        cy.get(".radio").should("include.text", "Category 1");
        cy.get(".radio > input").should("have.value", "#8ae1fc");
        cy.get(".submit--form").click();
        cy.get(".list__card:last-of-type").should("be.visible");
        cy.get(".list__card:last-of-type h2").should("have.text", "Task 1");
        cy.get(".list__card:last-of-type div").should("have.text", "lorem ipsum dori");
        cy.get(".list__card:last-of-type button").click();
        cy.contains("Task 1").should("not.be.visible");
        // Chain of event based on props (should be some lovely stuff in doc)
    });
});
