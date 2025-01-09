import { BOOKMARKS_DATA, BOOKMARKS_DATA_LOCAL_STORAGE } from '../../mocks';

describe('시작 가이드 기능 테스트', () => {
  it('시작 가이드 페이지에서 튜토리얼 버튼을 누르면 투토리얼이 시작되어야 합니다.', () => {
    cy.visit('/');

    cy.findByRole('button', { name: '시작 가이드' }).click();
    cy.findByRole('link', { name: '튜토리얼 시작하기' }).click();

    cy.get('#tour-tooltip').should('exist');
  });

  it('비로그인 상태에서 튜토리얼을 시작하고 종료하면 원래 저장된 북마크가 노출되어야 합니다.', () => {
    window.localStorage.setItem('bookmark', JSON.stringify(BOOKMARKS_DATA_LOCAL_STORAGE));

    cy.visit('/');

    cy.findByRole('button', { name: '시작 가이드' }).click();
    cy.findByRole('link', { name: '튜토리얼 시작하기' }).click();

    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();

    cy.findAllByRole('button', { name: '북마크 옵션' }).should('have.length', 3).eq(0).click({ force: true });

    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();

    cy.findByRole('button', { name: 'Bookmark Add' }).click({ force: true });

    /* 다이얼로그 오버레이로 인해 튜토리얼 버튼이 노출되지 않음 Label Text로 검색 */
    cy.findByLabelText('Last').click();

    cy.url().should('include', '/trash');
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();

    cy.findAllByRole('button', { name: '휴지통 북마크 옵션' }).click({ force: true });
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Last' }).click();

    cy.url().should('include', '/');

    cy.contains('a', 'Google').should('have.attr', 'href').and('include', 'https://google.com');
    cy.contains('a', '네이버').should('have.attr', 'href').and('include', 'https://naver.com');
  });

  it('로그인 상태에서 튜토리얼을 시작하고 종료하면 원래 저장된 북마크가 노출되어야 합니다.', () => {
    cy.login();
    cy.getBookmarks(200, BOOKMARKS_DATA).as('getBookmarks');
    cy.getTags(200, []).as('getTags');
    cy.getTrashBookmarks(200, []).as('getTrashBookmarks');

    cy.visit('/');

    cy.findByRole('button', { name: '시작 가이드' }).click();
    cy.findByRole('link', { name: '튜토리얼 시작하기' }).click();

    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();

    cy.findAllByRole('button', { name: '북마크 옵션' }).should('have.length', 3).eq(0).click({ force: true });

    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();

    cy.findByRole('button', { name: 'Bookmark Add' }).click({ force: true });

    /* 다이얼로그 오버레이로 인해 튜토리얼 버튼이 노출되지 않음 Label Text로 검색 */
    cy.findByLabelText('Last').click();

    cy.url().should('include', '/trash');
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();

    cy.findAllByRole('button', { name: '휴지통 북마크 옵션' }).click({ force: true });
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Last' }).click();

    cy.url().should('include', '/');

    cy.contains('a', 'Google').should('have.attr', 'href').and('include', 'https://google.com');
    cy.contains('a', '네이버').should('have.attr', 'href').and('include', 'https://naver.com');
  });
});
