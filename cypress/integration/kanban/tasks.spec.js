const mockedCategory = [
    {
        name: "Category a",
        color: "#C2C5BB",
    },
    {
        name: "Category b",
        color: "#B5DDA4",
    },
];

const mockedTasks = [
    {
        name: "Task a",
        text: "Lorem ipsum dori",
        category: 1,
    },
    {
        name: "Task b",
        text: "Lorem ipsum dori",
        category: 2,
    },
    {
        name: "Task c",
        text: "Lorem ipsum dori",
        category: 1,
    },
    {
        name: "Task d",
        text: "Lorem ipsum dori",
        category: 2,
    },
    {
        name: "Task e",
        text: "Lorem ipsum dori",
        category: 1,
    },
    {
        name: "Task f",
        text: "Lorem ipsum dori",
        category: 2,
    },
    {
        name: "Task g",
        text: "Lorem ipsum dori",
        category: 1,
    },
    {
        name: "Task H",
        text: "Lorem ipsum dori",
        category: 2,
    },
];

describe("Testing tasks", () => {
    before(() => {
        cy.visit("/");
        cy.wait(1000);

        cy.document().then((doc) => {
            const deleteTasks = doc.querySelectorAll(".card_button--remove");
            const deleteButtons = doc.querySelectorAll(".radio__delete");

            deleteTasks.forEach((task) => {
                cy.get(".card_button--remove").last().click();
            });
            cy.get(".add__open").click();
            for (let i = 0; i < deleteButtons.length; i++) {
                cy.get(".radio__delete").first().click();
            }
        });
        mockedCategory.forEach((category) => {
            cy.get("#newCategory").clear();
            cy.get("#newCategory").type(category.name).should("have.value", category.name);
            cy.get("input[type=color]").invoke("val", category.color).trigger("change");
            cy.get("#addCategory").click();
        });
        mockedTasks.forEach((task) => {
            cy.get("#header").type(task.name);
            cy.get("#text").type(task.text);
            if (task.category === 1) {
                cy.get("[type='radio']").first().check();
            } else {
                cy.get("[type='radio']").last().check();
            }
            cy.get(".submit--form").click();
            cy.get(".add__open").click();
        });
    });

    it("Creates 5 tasks with 2 different category", () => {
        cy.get("#0").find("div").should("have.length", 16);
        cy.get(".form__control--category").find("span").should("have.length", 2);
    });

    it("Initial testing of drag and drop", () => {
        const dataTransfer = new DataTransfer();

        cy.document().then((doc) => {
            const taskCard = doc.querySelectorAll(".list__card");
            const taskCardArr = Array.from(taskCard);
            const taskCardArrId = taskCardArr.map((task) => task.id);
            const firstElementOfArray = taskCardArrId[0];

            cy.get(".add__open").click();
            cy.get(`#${firstElementOfArray}`).trigger("dragstart", { dataTransfer });
            cy.get("#2").trigger("drop", { dataTransfer }); // waitForAnimations - walk around - does not work :) waitForAnimations: true
            // cy.get(`#${firstElementOfArray}`).trigger("dragend"); - walk around - does not work
            // cy.contains("Task f").parent().drag("#2"); - plugin - does not work

            cy.get("#2").find("div").should("have.length", 2);
        });

        // const dataTransfer = new DataTransfer();
    });
    // it("Initial testing of drag and drop", () => {
    //     cy.get(".list__card").first().trigger("dragstart");
    //     cy.get(".list__container").first().trigger("drop");
    // });
    // test if container has a child!
});
