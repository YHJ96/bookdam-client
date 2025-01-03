import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
  cy.setCookie('access', Cypress.env('access'));
});

Cypress.Commands.add('logout', (statusCode: number) => {
  cy.intercept('POST', 'http://localhost:8080/auth/logout', { statusCode }).as('logout');
});
