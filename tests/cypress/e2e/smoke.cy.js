describe("Smoke test", () => {
  it("visits home page", () => {
    cy.visit("/");
    cy.get("h2").should("contain", "Assets Board");
  });
});
