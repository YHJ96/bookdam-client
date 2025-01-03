import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
  cy.setCookie('access', Cypress.env('access'));
});

Cypress.Commands.add('logout', (statusCode: number) => {
  cy.intercept('POST', 'http://localhost:8080/auth/logout', { statusCode }).as('logout');
});

Cypress.Commands.add('getTags', (statusCode: number, body: any) => {
  cy.intercept('GET', 'http://localhost:8080/tag', {
    statusCode,
    body,
  });
});

Cypress.Commands.add('getBookmarks', (statusCode: number, body: any) => {
  cy.intercept('GET', 'http://localhost:8080/bookmark', {
    statusCode,
    body,
  });
});

Cypress.Commands.add('getTrashBookmarks', (statusCode: number, body: any) => {
  cy.intercept('GET', 'http://localhost:8080/trash', {
    statusCode,
    body,
  });
});

Cypress.Commands.add('redoTrashBookmark', (statusCode: number, id: number) => {
  cy.intercept('PATCH', `http://localhost:8080/trash/${id}`, {
    statusCode,
    body: {
      id,
    },
  });
});

Cypress.Commands.add('undoTrashBookmark', (statusCode: number, id: number) => {
  cy.intercept('DELETE', `http://localhost:8080/trash/${id}`, {
    statusCode,
    body: {
      id,
    },
  });
});
