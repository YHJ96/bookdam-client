import { BOOKMARKS_DATA, BOOKMARKS_DATA_LOCAL_STORAGE, TAGS_DATA } from '../../mocks';

describe('Header UI 테스트', () => {
  it('비로그인 상태에서는 로그인 버튼이 존재해야 합니다.', () => {
    cy.visit('/').should('exist');
    cy.findByRole('button', { name: '로그인' }).should('exist');
  });

  it('로그인 상태에서는 로그인 버튼이 존재하지 않아야 합니다.', () => {
    cy.login();
    cy.getBookmarks(200, BOOKMARKS_DATA);
    cy.getTags(200, TAGS_DATA);

    cy.visit('/').should('exist');
    cy.findByRole('button', { name: '로그인' }).should('not.exist');
    cy.findByText('네이버').should('exist');
  });

  it('북마크 페이지인 경우 헤더에 북마크 텍스트가 존재해야 합니다.', () => {
    cy.visit('/').should('exist');
    cy.findByRole('heading', { name: '북마크' }).should('exist');
  });

  it('휴지통 페이지인 경우 헤더에 휴지통 텍스트가 존재해야 합니다.', () => {
    cy.visit('/trash').should('exist');
    cy.findByRole('heading', { name: '휴지통' }).should('exist');
  });
});

describe('Excel 테스트', () => {
  before(() => {
    window.localStorage.setItem('bookmark', JSON.stringify(BOOKMARKS_DATA_LOCAL_STORAGE));
    cy.exec('rm -rf cypress/downloads');
  });

  after(() => {
    window.localStorage.removeItem('bookmark');
    cy.exec('rm -rf cypress/downloads');
  });

  it('엑셀 버튼을 클릭한 경우 엑셀이 다운로드 되어야 합니다', () => {
    cy.visit('/').should('exist');
    cy.findByRole('button', { name: '엑셀 다운로드' }).click();

    if (Cypress.platform === 'darwin') {
      cy.readFile('cypress/downloads/북마크.csv').should('exist');
    } else {
      cy.readFile('cypress/downloads/북마크.xls').should('exist');
    }
  });

  it('다운받은 엑셀 형식이 올바른지 확인합니다.', () => {
    cy.visit('/').should('exist');

    if (Cypress.platform === 'darwin') {
      cy.readFile('cypress/downloads/북마크.csv')
        .should('include', '네이버,네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요,https://naver.com')
        .and('include', 'Google,,https://google.com');
    } else {
      cy.readFile('cypress/downloads/북마크.xls')
        .should('include', '네이버,네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요,https://naver.com')
        .and('include', 'Google,,https://google.com');
    }
  });
});

describe('네비게이션 테스트', () => {
  it('로그인 버튼을 클릭한 경우 로그인 페이지로 이동해야 합니다.', () => {
    cy.visit('/').should('exist');
    cy.findByRole('button', { name: '로그인' }).click();
    cy.url().should('include', '/login');
  });
});
