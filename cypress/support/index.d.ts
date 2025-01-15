/* Custom Command OverRide */
declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
    logout(statusCode: number): Chainable<void>;
    createOgTag(statusCode: number, body: any): Chainable<void>;
    getTags(statusCode: number, body: any): Chainable<void>;
    getBookmarks(statusCode: number, body: any): Chainable<void>;
    createBookmark(statusCode: number, body: any): Chainable<void>;
    updateBookmark(statusCode: number, id: number, body: any): Chainable<void>;
    removeBookmark(statusCode: number, id: number): Chainable<void>;
    getTrashBookmarks(statusCode: number, body: any): Chainable<void>;
    redoTrashBookmark(statusCode: number, id: number): Chainable<void>;
    undoTrashBookmark(statusCode: number, id: number): Chainable<void>;
  }
}
