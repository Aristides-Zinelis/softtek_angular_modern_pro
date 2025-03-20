describe("Visit assets", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should visit first asset", () => {
    // cy.visit("/");
    cy.get("tbody > :nth-child(1) > :nth-child(1) > a").click();
  });
  it("should edit asset", () => {
    // cy.visit("/");
    cy.get("tbody > :nth-child(1) > :nth-child(1) > a").click();
    // type on inputs with name quantity and value
    cy.get('input[name="quantity"]').clear().type("3.14");
    cy.get('input[name="value"]').clear().type("2.71");
    // click button with type submit
    cy.get('button[type="submit"]').click();
    // navigate to total amount page
    cy.get("lab-total-amount > a").click();
    // check if the value of the input with name quantity is 3.14
    cy.get("tbody > :nth-child(1) > :nth-child(3)").should("contain", "3.14");
  });
});
