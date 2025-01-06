import { BOOKMARKS_DATA_LOCAL_STORAGE, TAGS_DATA_LOCAL_STORAGE } from '../../mocks';

describe('홈 검색 기능 테스트', () => {
  beforeEach(() => {
    window.localStorage.setItem('bookmark', JSON.stringify(BOOKMARKS_DATA_LOCAL_STORAGE));
    window.localStorage.setItem('tag', JSON.stringify(TAGS_DATA_LOCAL_STORAGE));
  });

  it('검색 입력창에 검색어를 입력하면 검색 결과가 출력되어야 합니다.', () => {
    cy.visit('http://localhost:3000').should('exist');

    cy.findByRole('search').type('네이버{enter}');

    cy.findByText('Google').should('not.exist');
    cy.findByText('네이버').should('exist');
  });

  it('태그가 선택되어 있고 검색어를 입력하면 태그가 포함된 검색 결과만 출력되어야 합니다.', () => {
    cy.visit('http://localhost:3000').should('exist');

    cy.findByText('ETC').click();
    cy.findByRole('search').type('네이버{enter}');

    cy.findByText('네이버').should('not.exist');
  });
});
