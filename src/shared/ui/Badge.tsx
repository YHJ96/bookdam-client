import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/shared/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors cursor-pointer',
  {
    variants: {
      variant: {
        default: 'border bg-badge',
        selected: 'border-transparent bg-badge-selected',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, variant, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
});
Badge.displayName = 'Badge';

export interface BadgeDeleteProps extends React.HTMLAttributes<HTMLButtonElement> {
  onDelete: () => void;
}

const BadgeDelete = React.forwardRef<HTMLButtonElement, BadgeDeleteProps>(
  ({ className, onDelete, children, ...props }, ref) => {
    return (
      <button ref={ref} className={className} {...props} onClick={onDelete}>
        <X className="h-3 w-3" />
        <span className="sr-only">Remove Tag</span>
      </button>
    );
  },
);
BadgeDelete.displayName = 'BadgeDelete';
export { Badge, BadgeDelete };
