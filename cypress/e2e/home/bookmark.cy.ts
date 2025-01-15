import { BOOKMARKS_DATA, BOOKMARKS_DATA_LOCAL_STORAGE } from '../../mocks';

describe('홈 UI 테스트', () => {
  it('홈 페이지에 접속 시 북마크가 존재하지 않는 경우 빈 페이지가 출력되어야 합니다.', () => {
    cy.visit('/').should('exist');
    cy.findByRole('heading', { name: '북마크가 비어 있습니다.' }).should('exist');
  });

  it('홈 페이지에 접속 시 북마크가 존재하는 경우 북마크가 출력되어야 합니다.', () => {
    window.localStorage.setItem('bookmark', JSON.stringify(BOOKMARKS_DATA_LOCAL_STORAGE));
    cy.visit('/').should('exist');
    cy.findByRole('heading', { name: '북마크가 비어 있습니다.' }).should('not.exist');

    cy.findByText('네이버').should('exist');
    cy.findByText('Google').should('exist');
  });
});

describe('홈 비로그인 기능 테스트', () => {
  beforeEach(() => {
    window.localStorage.setItem('bookmark', JSON.stringify(BOOKMARKS_DATA_LOCAL_STORAGE));
  });

  it('북마크를 클릭 시 외부 링크로 이동하여야 합니다.', () => {
    cy.visit('/').should('exist');

    cy.contains('a', 'Google').should('have.attr', 'href').and('include', 'https://google.com');
    cy.contains('a', '네이버').should('have.attr', 'href').and('include', 'https://naver.com');
  });

  it('북마크 삭제 버튼을 클릭 시 북마크가 삭제 되어야 합니다.', () => {
    cy.visit('/').should('exist');

    cy.findAllByRole('button', { name: '북마크 옵션' }).should('have.length', 2).eq(0).click();
    cy.findByRole('menuitem', { name: '삭제' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.findByText('Google').should('not.exist');
    cy.findByText('네이버').should('exist');

    cy.findByRole('button', { name: '휴지통' }).click();
    cy.url().should('include', '/trash');
    cy.findByText('Google').should('exist');
  });

  it('북마크 수정 버튼을 클릭 시 북마크가 수정 되어야 합니다.', () => {
    cy.visit('/').should('exist');

    cy.findAllByRole('button', { name: '북마크 옵션' }).should('have.length', 2).eq(0).click();

    cy.findByRole('menuitem', { name: '수정' }).click();
    cy.findByRole('dialog').should('exist');
    cy.findByLabelText('제목').should('exist').type('구글');
    cy.findByRole('button', { name: '북마크 수정' }).click();

    cy.findByText('Google').should('not.exist');
    cy.findByText('구글').should('exist');
  });
});

describe('홈 로그인 기능 테스트', () => {
  beforeEach(() => {
    cy.login();
    cy.getBookmarks(200, BOOKMARKS_DATA).as('getBookmarks');
    cy.getTags(200, []).as('getTags');
    cy.getTrashBookmarks(200, []).as('getTrashBookmarks');
  });

  it('북마크 삭제 버튼을 클릭 시 북마크가 삭제 되어야 합니다.', () => {
    cy.removeBookmark(200, BOOKMARKS_DATA[1].id).as('removeBookmark');

    cy.visit('/').should('exist');

    cy.findAllByRole('button', { name: '북마크 옵션' }).should('have.length', 2).eq(0).click();
    cy.findByRole('menuitem', { name: '삭제' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.wait('@removeBookmark');

    cy.findByRole('status').should('not.have.class', 'destructive');

    cy.findByText('Google').should('not.exist');
    cy.findByText('네이버').should('exist');

    cy.findByRole('button', { name: '휴지통' }).click();
    cy.url().should('include', '/trash');
    cy.findByText('Google').should('exist');
  });

  it('북마크 삭제 버튼을 누르면 500 오류가 나는 경우 오류 메시지가 출력되어야 합니다. ', () => {
    cy.removeBookmark(500, BOOKMARKS_DATA[1].id).as('removeBookmark');

    cy.visit('/').should('exist');

    cy.findAllByRole('button', { name: '북마크 옵션' }).should('have.length', 2).eq(0).click();
    cy.findByRole('menuitem', { name: '삭제' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.wait('@removeBookmark');

    cy.findByRole('status').should('have.class', 'destructive');

    cy.findByText('Google').should('exist');
    cy.findByText('네이버').should('exist');

    cy.findByRole('button', { name: '휴지통' }).click();
    cy.url().should('include', '/trash');
    cy.findByText('Google').should('not.exist');
  });

  it('북마크 수정 버튼을 클릭 시 북마크가 수정 되어야 합니다.', () => {
    cy.updateBookmark(200, BOOKMARKS_DATA[1].id, { ...BOOKMARKS_DATA[1], title: '구글' }).as('updateBookmark');

    cy.visit('/').should('exist');

    cy.findAllByRole('button', { name: '북마크 옵션' }).should('have.length', 2).eq(0).click();
    cy.findByRole('menuitem', { name: '수정' }).click();
    cy.findByRole('dialog').should('exist');

    cy.findByLabelText('제목').should('exist').type('구글');
    cy.findByRole('button', { name: '북마크 수정' }).click();

    cy.wait('@updateBookmark');

    cy.findByRole('status').should('not.have.class', 'destructive');

    cy.findByText('Google').should('not.exist');
    cy.findByText('구글').should('exist');
  });

  it('북마크 수정 버튼을 클릭 시 500 오류가 나는 경우 오류 메시지가 출력되어야 합니다.', () => {
    cy.updateBookmark(500, BOOKMARKS_DATA[1].id, { ...BOOKMARKS_DATA[1], title: '구글' }).as('updateBookmark');

    cy.visit('/').should('exist');

    cy.findAllByRole('button', { name: '북마크 옵션' }).should('have.length', 2).eq(0).click();
    cy.findByRole('menuitem', { name: '수정' }).click();
    cy.findByRole('dialog').should('exist');

    cy.findByLabelText('제목').should('exist').type('구글');
    cy.findByRole('button', { name: '북마크 수정' }).click();

    cy.wait('@updateBookmark');

    cy.findByRole('status').should('have.class', 'destructive');
    cy.findByText('Google').should('exist');
  });
});
