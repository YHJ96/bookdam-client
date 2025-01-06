import { BOOKMARKS_DATA, BOOKMARKS_DATA_LOCAL_STORAGE, TAGS_DATA } from '../../mocks';

describe('플로팅 버튼 UI 테스트', () => {
  it('북마크가 존재하지 않은 경우 애니메이션이 활성화 되어야합니다.', () => {
    cy.visit('/').should('exist');
    cy.findByRole('heading', { name: '북마크가 비어 있습니다.' }).should('exist');

    cy.get('div').should('have.class', 'animate-ping');
  });

  it('북마크가 존재하는 경우 애니메이션이 비활성화 되어야합니다.', () => {
    window.localStorage.setItem('bookmark', JSON.stringify(BOOKMARKS_DATA_LOCAL_STORAGE));
    cy.visit('/').should('exist');
    cy.findByRole('heading', { name: '북마크가 비어 있습니다.' }).should('not.exist');

    cy.get('div').should('not.have.class', 'animate-ping');
  });
});

describe('비로그인 플로팅 버튼 기능 테스트', () => {
  it('북마크를 추가하는 경우 정상적으로 북마크가 생성되어야 합니다.', () => {
    cy.createOgTag(200, {
      image: 'https://image10.coupangcdn.com/image/mobile/v3/img_fb_like.png',
      title: '쿠팡',
      description: '로켓배송',
      url: 'https://www.coupang.com',
    }).as('createOgTag');

    cy.visit('/').should('exist');

    cy.findByRole('button', { name: 'Bookmark Add' }).click();

    cy.findByRole('dialog').should('exist');

    cy.findByLabelText('제목').type('쿠팡');
    cy.findByLabelText('내용').type('로켓배송');
    cy.findByLabelText('URL').type('https://www.coupang.com');
    cy.findByRole('button', { name: '북마크 추가' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.wait('@createOgTag');

    cy.findByRole('status').should('not.have.class', 'destructive');

    cy.findByText('쿠팡').should('exist');
    cy.findByText('로켓배송').should('exist');
    cy.findByText('https://www.coupang.com').should('exist');
  });

  it('URL 형식이 아닌 경우 오류 메시지가 출력되어야 합니다.', () => {
    cy.visit('/').should('exist');

    cy.findByRole('button', { name: 'Bookmark Add' }).click();

    cy.findByRole('dialog').should('exist');

    cy.findByLabelText('제목').type('쿠팡');
    cy.findByLabelText('내용').type('로켓배송');
    cy.findByLabelText('URL').type('coupang');
    cy.findByRole('button', { name: '북마크 추가' }).click();
    cy.findByText('올바른 URL 형식을 입력해주세요.').should('exist');
  });

  it('북마크 추가 버튼을 클릭 시 500 오류가 나는 경우 오류 메시지가 출력되어야 합니다.', () => {
    cy.createOgTag(500, {}).as('createOgTag');

    cy.visit('/').should('exist');

    cy.findByRole('button', { name: 'Bookmark Add' }).click();

    cy.findByRole('dialog').should('exist');

    cy.findByLabelText('제목').type('쿠팡');
    cy.findByLabelText('내용').type('로켓배송');
    cy.findByLabelText('URL').type('https://www.coupang.com');
    cy.findByRole('button', { name: '북마크 추가' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.wait('@createOgTag');

    cy.findByRole('status').should('have.class', 'destructive');

    cy.findByText('쿠팡').should('not.exist');
    cy.findByText('로켓배송').should('not.exist');
    cy.findByText('https://www.coupang.com').should('not.exist');
  });
});

describe('로그인 플로팅 버튼 기능 테스트', () => {
  beforeEach(() => {
    cy.login();
    cy.getBookmarks(200, BOOKMARKS_DATA);
    cy.getTags(200, TAGS_DATA);
  });

  it('북마크를 생성하는 경우 정상적으로 북마크가 생성되어야 합니다.', () => {
    cy.visit('/').should('exist');

    cy.createBookmark(200, {
      id: 100000,
      image: 'https://image10.coupangcdn.com/image/mobile/v3/img_fb_like.png',
      title: '쿠팡',
      description: '로켓배송',
      url: 'https://www.coupang.com',
      tags: [],
      createdAt: new Date().toISOString(),
    }).as('createBookmark');

    cy.findByRole('button', { name: 'Bookmark Add' }).click();

    cy.findByRole('dialog').should('exist');

    cy.findByLabelText('제목').type('쿠팡');
    cy.findByLabelText('내용').type('로켓배송');
    cy.findByLabelText('URL').type('https://www.coupang.com');
    cy.findByRole('button', { name: '북마크 추가' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.wait('@createBookmark');

    cy.findByRole('status').should('not.have.class', 'destructive');

    cy.findByText('쿠팡').should('exist');
    cy.findByText('로켓배송').should('exist');
    cy.findByText('https://www.coupang.com').should('exist');
  });

  it('북마크 추가 버튼을 클릭 시 500 오류가 나는 경우 오류 메시지가 출력되어야 합니다.', () => {
    cy.createBookmark(500, {}).as('createBookmark');

    cy.visit('/').should('exist');

    cy.findByRole('button', { name: 'Bookmark Add' }).click();

    cy.findByRole('dialog').should('exist');

    cy.findByLabelText('제목').type('쿠팡');
    cy.findByLabelText('내용').type('로켓배송');
    cy.findByLabelText('URL').type('https://www.coupang.com');
    cy.findByRole('button', { name: '북마크 추가' }).click();
    cy.findByRole('button', { name: '확인' }).click();

    cy.wait('@createBookmark');

    cy.findByRole('status').should('have.class', 'destructive');

    cy.findByText('쿠팡').should('not.exist');
    cy.findByText('로켓배송').should('not.exist');
    cy.findByText('https://www.coupang.com').should('not.exist');
  });
});
