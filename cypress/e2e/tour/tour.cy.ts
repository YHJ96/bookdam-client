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
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Last' }).click();

    cy.url().should('include', '/trash');
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
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Last' }).click();

    cy.url().should('include', '/trash');

    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Next' }).click();
    cy.findByRole('button', { name: 'Last' }).click();

    cy.findByRole('button', { name: '북마크 추가하러 가기' }).click();

    cy.url().should('include', '/');

    cy.contains('a', 'Google').should('have.attr', 'href').and('include', 'https://google.com');
    cy.contains('a', '네이버').should('have.attr', 'href').and('include', 'https://naver.com');
  });
});

describe('튜토리얼 모달 테스트', () => {
  it('쿠키가 없는 경우 튜토리얼 모달이 노출되어야 합니다', () => {
    cy.clearCookies();
    cy.visit('/');

    cy.findByRole('dialog').should('exist');
  });

  it('쿠키가 있으며 쿠키의 값이 true인 경우 튜토리얼 모달이 노출되어야 합니다', () => {
    cy.setCookie('tutorial', 'true');
    cy.visit('/');
    cy.findByRole('dialog').should('exist');
  });

  it('쿠키가 있으며 쿠키의 값이 false인 경우 튜토리얼 모달이 노출되지 않아야 합니다', () => {
    cy.setCookie('tutorial', 'false');
    cy.visit('/');
    cy.findByRole('dialog').should('not.exist');
  });

  it('체크박스를 체크한 경우 쿠키의 값이 false로 변경되어야 합니다', () => {
    cy.setCookie('tutorial', 'true');
    cy.visit('/');
    cy.findByRole('dialog').should('exist');

    cy.findByRole('checkbox').should('exist').click();
    cy.visit('/');
    cy.findByRole('dialog').should('not.exist');
  });
});
