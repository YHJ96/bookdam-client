import { BOOKMARKS_DATA_LOCAL_STORAGE, TAGS_DATA_LOCAL_STORAGE } from '../../mocks';

describe('홈 태그 필터 기능 테스트', () => {
  it('선택한 태그의 북마크만 출력되야 합니다.', () => {
    window.localStorage.setItem('bookmark', JSON.stringify(BOOKMARKS_DATA_LOCAL_STORAGE));
    window.localStorage.setItem('tag', JSON.stringify(TAGS_DATA_LOCAL_STORAGE));

    cy.visit('/').should('exist');

    cy.findByText('ETC').click();

    cy.findByText('Google').should('exist');
    cy.findByText('네이버').should('not.exist');

    cy.findByText('IT').click();
    cy.findByText('ETC').click();

    cy.findByText('Google').should('not.exist');
    cy.findByText('네이버').should('exist');
  });
});
