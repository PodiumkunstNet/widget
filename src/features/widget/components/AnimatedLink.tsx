'use client';

import Link from 'next/link';
import React, { CSSProperties } from 'react';
import useAnimatedRouter from '../hooks/useAnimatedRouter';

type Props = {
  href: string;
  children: React.ReactNode;
  classes: string;
  handleClick?: () => void;
  style?: CSSProperties;
};
export default function AnimatedLink({
  href,
  children,
  classes,
  handleClick,
  style,
}: Props) {
  const { animatedRoute } = useAnimatedRouter();
  return (
    <Link
      className={classes}
      href={href}
      style={style}
      onClick={() => {
        if (handleClick) {
          handleClick();
        }
        animatedRoute(href);
      }}
      passHref
    >
      {children}
    </Link>
  );
}
