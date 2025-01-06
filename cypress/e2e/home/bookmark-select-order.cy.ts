import { title } from 'process';

import { BOOKMARKS_DATA_LOCAL_STORAGE } from '../../mocks';

describe('홈 북마크 정렬 기능 테스트', () => {
  it('북마크 정렬 기능이 동작해야 합니다.', () => {
    window.localStorage.setItem('bookmark', JSON.stringify(BOOKMARKS_DATA_LOCAL_STORAGE));

    cy.visit('http://localhost:3000').should('exist');

    cy.findByRole('combobox').click();
    cy.findByText('오래된순').click();

    const descTitleList: string[] = [];
    cy.findAllByLabelText('bookmark').should('have.length', 2);
    cy.findAllByLabelText('bookmark').each(($element) => descTitleList.push($element.find('h3').text()));

    cy.wrap(descTitleList).then((titles) => {
      expect(titles).to.be.deep.equal(['네이버', 'Google']);
    });

    const ascTitleList: string[] = [];
    cy.findByRole('combobox').click();
    cy.findByText('최신순').click();

    cy.findAllByLabelText('bookmark').each(($element) => ascTitleList.push($element.find('h3').text()));

    cy.wrap(ascTitleList).then((titles) => {
      expect(titles).to.be.deep.equal(['Google', '네이버']);
    });
  });
});
