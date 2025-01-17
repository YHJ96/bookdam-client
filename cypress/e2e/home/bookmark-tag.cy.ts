import { BOOKMARKS_DATA, BOOKMARKS_DATA_LOCAL_STORAGE, TAGS_DATA, TAGS_DATA_LOCAL_STORAGE } from '../../mocks';

describe('태그 비로그인 기능 테스트', () => {
  beforeEach(() => {
    window.localStorage.setItem('bookmark', JSON.stringify(BOOKMARKS_DATA_LOCAL_STORAGE));
    window.localStorage.setItem('tag', JSON.stringify(TAGS_DATA_LOCAL_STORAGE));
  });

  it('홈 페이지에 접속 시 북마크에 태그가 존재하는 경우 태그가 출력되어야 합니다.', () => {
    cy.visit('/').should('exist');

    cy.findByText('IT').should('exist');
    cy.findByText('ETC').should('exist');
  });

  it('북마크를 생성한 경우 태그가 중복되는 경우 중복되지 않아야 합니다.', () => {
    cy.visit('/').should('exist');

    cy.createOgTag(200, {
      image: 'https://image10.coupangcdn.com/image/mobile/v3/img_fb_like.png',
      title: '쿠팡',
      description: '로켓배송',
      url: 'https://www.coupang.com',
      tags: ['IT'],
    }).as('createOgTag');

    cy.findByRole('button', { name: 'Bookmark Add' }).click();

    cy.findByRole('dialog').should('exist');

    cy.findByLabelText('제목').type('쿠팡');
    cy.findByLabelText('내용').type('로켓배송');
    cy.findByLabelText('URL').type('https://www.coupang.com');
    cy.findByPlaceholderText('태그 추가').type('IT{enter}');

    cy.findByRole('button', { name: '북마크 추가' }).click();

    cy.wait('@createOgTag');

    cy.findByText('IT').should('exist').and('have.length', 1);
    cy.findByText('ETC').should('exist');
  });

  it('태그를 수정한 경우 태그가 수정되어야 합니다.', () => {
    cy.visit('/').should('exist');

    cy.findAllByRole('button', { name: '북마크 옵션' }).should('have.length', 2).eq(0).click();

    cy.findByRole('menuitem', { name: '수정' }).click();
    cy.findByRole('dialog').should('exist');
    cy.findByLabelText('제목').should('exist').type('구글');
    cy.findByPlaceholderText('태그 추가').type('검색{enter}');
    cy.findByRole('button', { name: '북마크 수정' }).click();

    cy.findByText('IT').should('exist');
    cy.findByText('ETC').should('exist');
    cy.findByText('검색').should('exist');
  });

  it('태그를 삭제한 경우 태그가 삭제되어야 합니다.', () => {
    cy.visit('/').should('exist');

    cy.findAllByRole('button', { name: '북마크 옵션' }).should('have.length', 2).eq(0).click();
    cy.findByRole('menuitem', { name: '삭제' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.findByText('IT').should('exist');
    cy.findByText('ETC').should('not.exist');
  });
});

describe('태그 로그인 기능 테스트', () => {
  beforeEach(() => {
    cy.login();
    cy.getBookmarks(200, BOOKMARKS_DATA).as('getBookmarks');
    cy.getTags(200, TAGS_DATA).as('getTags');
  });

  it('홈 페이지에 접속 시 북마크에 태그가 존재하는 경우 태그가 출력되어야 합니다.', () => {
    cy.visit('/').should('exist');

    cy.findByText('IT').should('exist');
    cy.findByText('ETC').should('exist');
  });

  it('태그를 생성한 경우 태그가 중복되는 경우 중복되지 않아야 합니다.', () => {
    cy.createBookmark(200, {
      id: 100000,
      image: 'https://image10.coupangcdn.com/image/mobile/v3/img_fb_like.png',
      title: '쿠팡',
      description: '로켓배송',
      url: 'https://www.coupang.com',
      tags: ['IT'],
      createdAt: new Date().toISOString(),
    }).as('createBookmark');

    cy.visit('/').should('exist');

    cy.findByRole('button', { name: 'Bookmark Add' }).click();

    cy.findByRole('dialog').should('exist');
    cy.findByLabelText('제목').type('쿠팡');
    cy.findByLabelText('내용').type('로켓배송');
    cy.findByLabelText('URL').type('https://www.coupang.com');
    cy.findByPlaceholderText('태그 추가').type('IT{enter}');
    cy.findByRole('button', { name: '북마크 추가' }).click();

    cy.wait('@createBookmark');

    cy.findByText('IT').should('exist').and('have.length', 1);
    cy.findByText('ETC').should('exist');
  });

  it('태그를 수정한 경우 태그가 수정되어야 합니다.', () => {
    cy.updateBookmark(200, BOOKMARKS_DATA[1].id, { ...BOOKMARKS_DATA[1], title: '구글' }).as('updateBookmark');

    cy.visit('/').should('exist');

    cy.findAllByRole('button', { name: '북마크 옵션' }).should('have.length', 2).eq(0).click();

    cy.findByRole('menuitem', { name: '수정' }).click();
    cy.findByRole('dialog').should('exist');
    cy.findByLabelText('제목').should('exist').type('구글');
    cy.findByPlaceholderText('태그 추가').type('검색{enter}');
    cy.findByRole('button', { name: '북마크 수정' }).click();

    cy.wait('@updateBookmark');

    cy.findByText('IT').should('exist');
    cy.findByText('ETC').should('exist');
    cy.findByText('검색').should('exist');
  });

  it('태그를 삭제한 경우 태그가 삭제되어야 합니다.', () => {
    cy.removeBookmark(200, BOOKMARKS_DATA[1].id).as('removeBookmark');

    cy.visit('/').should('exist');

    cy.findAllByRole('button', { name: '북마크 옵션' }).should('have.length', 2).eq(0).click();
    cy.findByRole('menuitem', { name: '삭제' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.findByText('IT').should('exist');
    cy.findByText('ETC').should('not.exist');
  });
});
