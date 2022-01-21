describe("Testing drag and drop", () => {
    before(() => {
        cy.visit("http://localhost:5002");
    });
    it("Initial testing of drag and drop", () => {
        cy.get(".list__card").first().trigger("dragstart");
        cy.get(".list__container").last().trigger("drop");
    });
    it("Initial testing of drag and drop", () => {
        cy.get(".list__card").first().trigger("dragstart");
        cy.get(".list__container").first().trigger("drop");
    });
    // test if container has a child!
});
