describe('Footer 기능 테스트', () => {
  it('GitHub 버튼을 클릭하면 Github 페이지로 이동해야 합니다.', () => {
    cy.visit('/').should('exist');
    cy.findByRole('link', { name: 'GitHub' }).should('have.attr', 'href', 'https://github.com/YHJ96');
  });

  it('Email 버튼을 클릭하면 이메일 클립보드로 이동해야 합니다.', () => {
    cy.visit('/').should('exist');
    cy.findByRole('link', { name: 'Email' }).should('have.attr', 'href', 'mailto:9668788@gmail.com');
  });
});
