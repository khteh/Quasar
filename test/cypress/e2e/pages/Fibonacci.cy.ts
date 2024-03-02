describe('FibonacciPage tests', () => {
  beforeEach(() => {
    cy.visit('/#/fibonacci');
  });
  it('Invalid input should result in errors', () => {
    cy.get("[data-test='inputFibonacci']").should("be.enabled");
    cy.get("[data-test='inputFibonacci']").focus().type("Hello");
    cy.get("[data-test='btnFibonacci']").should("not.be.enabled");
    cy.get('#fibResult').should('have.value', '1');
  });
  it('Valid input should succeed', () => {
    cy.get("[data-test='inputFibonacci']").should("be.enabled");
    cy.get("[data-test='inputFibonacci']").focus().type("20");
    cy.get("[data-test='btnFibonacci']").click();
    cy.get('#fibResult').should('have.value', '6765');
  });
});