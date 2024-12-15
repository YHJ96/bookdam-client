import * as React from 'react';

import { X } from 'lucide-react';

import { cn } from '@/shared/utils';
import { Hide } from '@/shared/utils/react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  isDelete?: boolean;
  onDelete?: () => void;
}

function Badge({ className, isDelete, onDelete, children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-md border border-transparent bg-[#F4F4F5] px-2.5 py-0.5 text-xs font-semibold text-[#18181B] transition-colors dark:bg-[#27272A] dark:text-[#FAFAFA]',
        className,
      )}
      {...props}
    >
      {children}

      <Hide
        condition={!isDelete}
        component={
          <button type="button" onClick={onDelete}>
            <X className="h-3 w-3" />
            <span className="sr-only">Remove Tag</span>
          </button>
        }
      />
    </div>
  );
}

export { Badge };
