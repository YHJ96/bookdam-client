import '@testing-library/cypress/add-commands';

beforeEach(() => {
  cy.setCookie('tutorial', 'false');
});

afterEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.removeAllListeners();
});

Cypress.Commands.add('login', () => {
  cy.setCookie('access', Cypress.env('CYPRESS_ACCESS'));
});

Cypress.Commands.add('logout', (statusCode: number) => {
  cy.intercept('POST', `${Cypress.env('CYPRESS_SERVER_URL')}/auth/logout`, { statusCode });
});

Cypress.Commands.add('createOgTag', (statusCode: number, body: any) => {
  cy.intercept('POST', `${Cypress.env('CYPRESS_SERVER_URL')}/bookmark/og`, {
    statusCode,
    body,
  });
});

Cypress.Commands.add('getTags', (statusCode: number, body: any) => {
  cy.intercept('GET', `${Cypress.env('CYPRESS_SERVER_URL')}/tag`, {
    statusCode,
    body,
  });
});

Cypress.Commands.add('getBookmarks', (statusCode: number, body: any) => {
  cy.intercept('GET', `${Cypress.env('CYPRESS_SERVER_URL')}/bookmark`, {
    statusCode,
    body,
  });
});

Cypress.Commands.add('createBookmark', (statusCode: number, body: any) => {
  cy.intercept('POST', `${Cypress.env('CYPRESS_SERVER_URL')}/bookmark`, {
    statusCode,
    body,
  });
});

Cypress.Commands.add('updateBookmark', (statusCode: number, id: number, body: any) => {
  cy.intercept('PATCH', `${Cypress.env('CYPRESS_SERVER_URL')}/bookmark/${id}`, {
    statusCode,
    body,
  });
});

Cypress.Commands.add('removeBookmark', (statusCode: number, id: number) => {
  cy.intercept('DELETE', `${Cypress.env('CYPRESS_SERVER_URL')}/bookmark/${id}`, {
    statusCode,
    body: {
      id,
    },
  });
});

Cypress.Commands.add('getTrashBookmarks', (statusCode: number, body: any) => {
  cy.intercept('GET', `${Cypress.env('CYPRESS_SERVER_URL')}/trash`, {
    statusCode,
    body,
  });
});

Cypress.Commands.add('redoTrashBookmark', (statusCode: number, id: number) => {
  cy.intercept('PATCH', `${Cypress.env('CYPRESS_SERVER_URL')}/trash/${id}`, {
    statusCode,
    body: {
      id,
    },
  });
});

Cypress.Commands.add('undoTrashBookmark', (statusCode: number, id: number) => {
  cy.intercept('DELETE', `${Cypress.env('CYPRESS_SERVER_URL')}/trash/${id}`, {
    statusCode,
    body: {
      id,
    },
  });
});
