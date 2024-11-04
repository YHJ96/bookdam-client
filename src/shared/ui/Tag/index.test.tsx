import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tag } from './index';

describe('Tag Component', () => {
  test('isDelete 옵션에 따라 X 버튼이 나타나야 합니다.', () => {
    const { rerender } = render(<Tag theme="light" />);
    let $button = screen.queryByRole('button');

    expect($button).not.toBeInTheDocument();

    rerender(<Tag theme="light" isDelete={true} />);
    $button = screen.queryByRole('button');

    expect($button).toBeInTheDocument();
  });

  test('X 버튼을 클릭시 onDelete 함수가 호출되어야 합니다.', async () => {
    const onDelete = vi.fn();
    render(<Tag theme="light" isDelete={true} onDelete={onDelete} />);

    const $button = screen.getByRole('button');
    await userEvent.click($button);

    expect(onDelete).toHaveBeenCalled();
  });

  test('태그의 테마가 변경되면 변경된 스타일이 적용되야 합니다.', () => {
    const { rerender } = render(<Tag theme="light">React</Tag>);
    const $tag = screen.getByText('React');

    expect($tag).toHaveClass('bg-gray-100');
    expect($tag).toHaveClass('text-gray-600');
    expect($tag).toHaveClass('border-gray-400');

    rerender(<Tag theme="dark">React</Tag>);

    expect($tag).toHaveClass('bg-gray-800');
    expect($tag).toHaveClass('text-gray-300');
    expect($tag).toHaveClass('border-gray-600');
  });
});
