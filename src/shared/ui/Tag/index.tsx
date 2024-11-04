import * as React from 'react';

import { X } from 'lucide-react';

import type { Theme } from '@/shared/types';
import { cn } from '@/shared/utils';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  isDelete?: boolean;
  onDelete?: () => void;
  theme: Theme;
}

/* https://github.com/storybookjs/storybook/issues/9511 */
const Tag = React.forwardRef((props: TagProps, ref: React.Ref<HTMLSpanElement>) => {
  const { isDelete, onDelete, theme, children, className, ...rest } = props;

  const styles = {
    light: 'bg-gray-100 text-gray-600 border-gray-400',
    dark: 'bg-gray-800 text-gray-300 border-gray-600',
  };

  const currentStyle = styles[theme];

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-md border-2 px-12 py-4 text-sm font-medium shadow-sm transition-all duration-300 ease-in-out hover:shadow-md',
        className,
        currentStyle,
      )}
      {...rest}
    >
      {children}
      {isDelete && (
        <button className="ml-6" onClick={onDelete}>
          <X className="h-14 w-14" />
        </button>
      )}
    </span>
  );
});
Tag.displayName = 'Tag';

export { Tag };
