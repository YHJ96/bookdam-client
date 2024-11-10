import { render, screen } from '@testing-library/react';

import Footer from './index';

describe('Footer Component', () => {
  test('깃허브 아이콘을 클릭시 외부 사이트로 깃허브 리파지토리로 이동해야합니다.', () => {
    render(<Footer />);

    const $icon = screen.getByText('GitHub').closest('a');
    const href = $icon?.getAttribute('href');
    const target = $icon?.getAttribute('target');

    expect(href).toBe('https://github.com/YHJ96');
    expect(target).toBe('_blank');
  });

  test('메일 아이콘을 클릭시 메일 전송 폼으로 이동해야합니다.', () => {
    render(<Footer />);

    const $icon = screen.getByText('Email').closest('a');
    const href = $icon?.getAttribute('href');

    expect(href).toBe('mailto:9668788@gmail.com');
  });
});
