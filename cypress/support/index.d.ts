/* Custom Command OverRide */
declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
    logout(statusCode: number): Chainable<void>;
    getTags(statusCode: number, body: any): Chainable<void>;
    getBookmarks(statusCode: number, body: any): Chainable<void>;
    getTrashBookmarks(statusCode: number, body: any): Chainable<void>;
    redoTrashBookmark(statusCode: number, id: number): Chainable<void>;
    undoTrashBookmark(statusCode: number, id: number): Chainable<void>;
  }
}
