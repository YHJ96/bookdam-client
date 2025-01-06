import { BOOKMARKS_DATA, TRASH_BOOKMARKS_DATA_LOCAL_STORAGE } from '../../mocks';

describe('휴지통 UI 테스트', () => {
  it('휴지통 북마크 페이지에 접속 시 북마크가 존재하지 않는 경우 빈 페이지가 출력되어야 합니다.', () => {
    cy.visit('/trash').should('exist');
    cy.findByRole('heading', { name: '휴지통이 비어 있습니다' }).should('exist');
  });

  it('휴지통 북마크 페이지에 접속 시 북마크가 존재하는 경우 북마크가 출력되어야 합니다.', () => {
    window.localStorage.setItem('trash-bookmark', JSON.stringify(TRASH_BOOKMARKS_DATA_LOCAL_STORAGE));
    cy.visit('/trash').should('exist');

    cy.findByRole('heading', { name: '휴지통이 비어 있습니다' }).should('not.exist');
    cy.findByText('네이버').should('exist');
    cy.findByText('Google').should('exist');
  });
});

describe('휴지통 비로그인 기능 테스트', () => {
  beforeEach(() => {
    window.localStorage.setItem('trash-bookmark', JSON.stringify(TRASH_BOOKMARKS_DATA_LOCAL_STORAGE));
  });

  it('휴지통의 복구 버튼을 누르면 북마크가 복구 되어야합니다.', () => {
    cy.visit('/trash').should('exist');

    cy.findAllByRole('button', { name: '휴지통 북마크 옵션' }).should('have.length', 2).eq(0).click();
    cy.findByRole('menuitem', { name: '복구' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.findByText('네이버').should('not.exist');
    cy.findByText('Google').should('exist');

    cy.findByRole('button', { name: '북마크' }).click();
    cy.url().should('not.include', '/trash');
    cy.findByText('네이버').should('exist');
  });

  it('휴지통의 삭제 버튼을 누르면 북마크가 삭제 되어야합니다.', () => {
    cy.visit('/trash').should('exist');

    cy.findAllByRole('button', { name: '휴지통 북마크 옵션' }).should('have.length', 2).eq(0).click();
    cy.findByRole('menuitem', { name: '영구 삭제' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.findByText('네이버').should('not.exist');
    cy.findByText('Google').should('exist');
  });
});

describe('휴지통 로그인 기능 테스트', () => {
  beforeEach(() => {
    cy.login();
    cy.getTrashBookmarks(200, BOOKMARKS_DATA).as('getTrashBookmarks');
    cy.getBookmarks(200, []).as('getBookmarks');
    cy.getTags(200, []).as('getTags');
  });

  it('휴지통의 복구 버튼을 누르면 북마크가 복구 되어야합니다.', () => {
    cy.redoTrashBookmark(200, BOOKMARKS_DATA[0].id).as('redoTrashBookmark');

    cy.visit('/trash').should('exist');

    cy.findAllByRole('button', { name: '휴지통 북마크 옵션' }).should('have.length', 2).eq(0).click();
    cy.findByRole('menuitem', { name: '복구' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.wait('@redoTrashBookmark');

    cy.findByRole('status').should('not.have.class', 'destructive');
    cy.findByText('네이버').should('not.exist');

    cy.findByRole('button', { name: '북마크' }).click();
    cy.url().should('not.include', '/trash');
    cy.findByText('네이버').should('exist');
  });

  it('휴지통의 복구 버튼을 누르면 500 오류가 나는 경우 오류 메시지가 출력되어야 합니다.', () => {
    cy.redoTrashBookmark(500, BOOKMARKS_DATA[0].id).as('redoTrashBookmark');

    cy.visit('/trash').should('exist');

    cy.findAllByRole('button', { name: '휴지통 북마크 옵션' }).should('have.length', 2).eq(0).click();
    cy.findByRole('menuitem', { name: '복구' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.wait('@redoTrashBookmark');

    cy.findByRole('status').should('have.class', 'destructive');
    cy.findByText('네이버').should('exist');

    cy.findByRole('button', { name: '북마크' }).click();
    cy.url().should('not.include', '/trash');
    cy.findByText('네이버').should('not.exist');
  });

  it('휴지통의 삭제 버튼을 누르면 북마크가 삭제 되어야합니다.', () => {
    cy.undoTrashBookmark(200, BOOKMARKS_DATA[0].id).as('undoTrashBookmark');

    cy.visit('/trash').should('exist');

    cy.findAllByRole('button', { name: '휴지통 북마크 옵션' }).should('have.length', 2).eq(0).click();
    cy.findByRole('menuitem', { name: '영구 삭제' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.wait('@undoTrashBookmark');

    cy.findByRole('status').should('not.have.class', 'destructive');
    cy.findByText('네이버').should('not.exist');
  });

  it('휴지통의 삭제 버튼을 누르면 500 오류가 나는 경우 오류 메시지가 출력되어야 합니다.', () => {
    cy.undoTrashBookmark(500, BOOKMARKS_DATA[0].id).as('undoTrashBookmark');

    cy.visit('/trash').should('exist');

    cy.findAllByRole('button', { name: '휴지통 북마크 옵션' }).should('have.length', 2).eq(0).click();
    cy.findByRole('menuitem', { name: '영구 삭제' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.wait('@undoTrashBookmark');

    cy.findByRole('status').should('have.class', 'destructive');
    cy.findByText('네이버').should('exist');
  });
});
