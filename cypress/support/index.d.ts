/* Custom Command OverRide */
declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
    logout(statusCode: number): Chainable<void>;
  }
}
