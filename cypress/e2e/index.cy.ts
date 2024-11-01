it('App', () => {
  cy.visit('http://localhost:3000').should('exist');
  cy.findByText('App').should('exist');
});
