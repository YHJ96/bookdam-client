import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
  cy.setCookie('access', Cypress.env('access'));
});
