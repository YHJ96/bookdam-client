import { render, screen } from '@testing-library/react';

import BookMarkCard from './BookMarkCard';
import { MOCK } from './mock';

describe('BookMarkCard Component', () => {
  test('카드를 클릭시 외부 사이트로 URL에 입력된 사이트로 이동해야합니다.', () => {
    render(<BookMarkCard theme="light" title={MOCK.TITLE} description={MOCK.DESCRIPTION} url={MOCK.URL} />);

    const $card = screen.getByRole('link');
    const url = $card.getAttribute('href');
    const target = $card.getAttribute('target');

    expect(url).toBe(MOCK.URL);
    expect(target).toBe('_blank');
  });

  test('카드의 테마가 변경되면 변경된 스타일이 적용되야 합니다.', () => {
    const { rerender } = render(
      <BookMarkCard theme="light" title={MOCK.TITLE} description={MOCK.DESCRIPTION} url={MOCK.URL} />,
    );

    const $title = screen.getByText(MOCK.TITLE);
    const $description = screen.getByText(MOCK.DESCRIPTION);
    const $url = screen.getByText(MOCK.URL);

    expect($title).toHaveClass('text-blue-600');
    expect($description).toHaveClass('text-gray-600');
    expect($url).toHaveClass('text-gray-500');

    rerender(<BookMarkCard theme="dark" title={MOCK.TITLE} description={MOCK.DESCRIPTION} url={MOCK.URL} />);

    expect($title).toHaveClass('text-blue-400');
    expect($description).toHaveClass('text-gray-400');
    expect($url).toHaveClass('text-gray-300');
  });
});
