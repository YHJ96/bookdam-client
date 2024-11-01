/* Custom Command OverRide */
declare namespace Cypress {
  interface Chainable {
    ex(): Chainable<void>;
  }
}
