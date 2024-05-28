'use client';
import { useEffect, useState } from 'react';
import config from '../../../../tailwind.config';

const screens = config?.theme?.screens as Record<'sm' | 'md' | 'lg', string>;
export type Breakpoint = keyof typeof screens;

const parsePixelValue = (value: string): number => {
  return Number(value.replace('px', ''));
};

const useCurrentBreakpoint = (): Breakpoint | null => {
  const getBreakpoint = (width: number): Breakpoint | null => {
    const sortedBreakpoints = Object.entries(screens)
      .map(([key, value]) => [key, parsePixelValue(value)])
      .sort((a, b) => ((a[1] as number) - (b[1] as number)) as number);

    let currentBreakpoint: Breakpoint = 'sm'; // Default to 'sm' for widths below the smallest breakpoint

    for (const [breakpoint, minWidth] of sortedBreakpoints) {
      if (width >= (minWidth as number)) {
        currentBreakpoint = breakpoint as Breakpoint;
      } else {
        break; // Exit the loop once the width is less than a breakpoint
      }
    }

    return currentBreakpoint;
  };

  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint | null>(
    null
  );

  useEffect(() => {
    // Set the breakpoint based on the current window size
    if (typeof window !== 'undefined') {
      setCurrentBreakpoint(getBreakpoint(window.innerWidth));
    }

    const handleResize = () => {
      setCurrentBreakpoint(getBreakpoint(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return currentBreakpoint;
};

export default useCurrentBreakpoint;
