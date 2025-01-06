describe('Sidebar UI 테스트', () => {
  it('비로그인 상태에서는 사용자 아이콘이 존재하지 않아야 합니다.', () => {
    cy.visit('/').should('exist');
    cy.findByRole('img', { name: 'UserAvatar' }).should('not.exist');
  });

  it('로그인 상태에서는 사용자 아이콘이 존재해야 합니다.', () => {
    cy.login();
    cy.visit('/').should('exist');
    cy.findByRole('img', { name: 'UserAvatar' }).should('exist');
  });
});

describe('네비게이션 테스트', () => {
  it('북마크 네비게이션을 클릭 시 북마크 페이지로 이동해야 합니다.', () => {
    cy.visit('/trash').should('exist');
    cy.findByRole('link', { name: '북마크' }).should('exist').click();
    cy.url().should('include', '/');
  });

  it('휴지통 네비게이션을 클릭 시 휴지통 페이지로 이동해야 합니다.', () => {
    cy.visit('/').should('exist');
    cy.findByRole('link', { name: '휴지통' }).should('exist').click();
    cy.url().should('include', '/trash');
  });
});

describe('로그인 기능 테스트', () => {
  beforeEach(() => {
    cy.login();
    cy.getBookmarks(200, []);
    cy.getTags(200, []);
    cy.getTrashBookmarks(200, []);
  });

  it('테마 버튼을 누르는 경우 테마가 변경되어야 합니다.', () => {
    cy.visit('/').should('exist');
    cy.findByRole('img', { name: 'UserAvatar' }).click();

    cy.findAllByRole('tab').should('exist').eq(1).click();
    cy.get('html').should('have.class', 'light');

    cy.findAllByRole('tab').should('exist').eq(2).click();
    cy.get('html').should('have.class', 'dark');
  });

  it('로그아웃 버튼을 클릭 시 로그아웃 되어야 합니다.', () => {
    cy.logout(200).as('logout');
    cy.visit('/').should('exist');
    cy.findByRole('img', { name: 'UserAvatar' }).click();

    cy.findByRole('button', { name: '로그아웃' }).click();

    cy.wait('@logout');

    cy.findByRole('img', { name: 'UserAvatar' }).should('not.exist');
    cy.findByRole('status').should('not.have.class', 'destructive');
  });

  it('로그아웃 버튼을 클릭 시 500 오류가 나는 경우 오류 메시지가 출력되어야 합니다.', () => {
    cy.logout(500).as('logout');
    cy.visit('/').should('exist');
    cy.findByRole('img', { name: 'UserAvatar' }).click();

    cy.findByRole('button', { name: '로그아웃' }).click();

    cy.wait('@logout');

    cy.findByRole('img', { name: 'UserAvatar' }).should('not.exist');
    cy.findByRole('status').should('have.class', 'destructive');
  });

  it('로그아웃 버튼을 클릭 시 401 오류가 나는 경우 로그아웃이 진행되고 쿠키가 삭제되어야 합니다.', () => {
    cy.logout(401).as('logout');
    cy.visit('/').should('exist');
    cy.findByRole('img', { name: 'UserAvatar' }).click();

    cy.findByRole('button', { name: '로그아웃' }).click();

    cy.wait('@logout');

    cy.getCookie('access').should('not.exist');
    cy.findByRole('img', { name: 'UserAvatar' }).should('not.exist');
  });
});
