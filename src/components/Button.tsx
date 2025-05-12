import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../utils/cn';

// transition-opacity ease-in duration-700 opacity-0 hover:opacity-100

const buttonVariants = cva('', {
  variants: {
    intent: {
      main: 'text-primary-white hover:bg-primary-white hover:text-primary-orange',
      sub: 'text-primary-white hover:bg-primary-white hover:text-primary-blue',
      animatedMain:
        'border-b-2 border-primary-white px-1 hover:bg-primary-white hover:px-2 hover:text-primary-orange',
      animatedSub:
        'border-b-2 border-primary-white px-1 hover:bg-primary-white hover:px-2 hover:text-primary-blue',
    },
  },
  defaultVariants: {
    intent: 'main',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
  showIconOnHoverOnly?: boolean;
  as?: React.ElementType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      intent,
      disabled,
      as = 'button',
      type = 'button',
      icon,
      children,
      showIconOnHoverOnly = false,
      ...props
    },
    ref
  ) => {
    const Component = as;
    return (
      <Component
        className={cn(
          'group flex cursor-pointer flex-nowrap items-center justify-center whitespace-nowrap transition-all  duration-300 ease-in',
          buttonVariants({ intent, className }),
          className
        )}
        ref={ref}
        type={type}
        disabled={disabled}
        aria-disabled={disabled}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              showIconOnHoverOnly && 'hidden group-hover:block',
              'mr-1'
            )}
          >
            {icon}
          </div>
        )}
        {children}
      </Component>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
