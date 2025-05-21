import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../utils/cn';

const TextVariants = cva('', {
  variants: {
    intent: {
      h1: 'font-euclid text-2xl font-bold text-text-primary',
      h2: 'font-euclid text-xs font-bold text-text-primary lg:text-sm',
      subtitle:
        'font-euclid text-[10px] font-normal leading-[14px] text-text-primary',
      body: 'font-goodsans text-sm font-normal leading-6 text-text-primary',
      button:
        'font-euclid text-sm font-bold leading-6 text-text-primary group-hover:text-primary-orange',
      buttonSub:
        'font-euclid text-sm font-bold text-text-primary group-hover:text-primary-blue',
      field: 'font-euclid text-sm font-light leading-6 text-text-primary',
      label: 'font-euclid text-[10px] font-light leading-3 text-text-primary',
      helper: 'font-euclid text-[12px] font-light leading-5 text-text-primary',
    },
  },
  defaultVariants: {
    intent: 'body',
  },
});

export interface TextProps
  extends React.ButtonHTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof TextVariants> {
  loading?: boolean;
  as?: React.ElementType;
  tabIndex?: number;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, intent, as = 'p', children, ...props }, ref) => {
    const Component = as;
    return (
      <Component
        className={cn(TextVariants({ intent, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = 'Text';

export { Text, TextVariants };
