'use client';

import Logo from '@/features/shared/components/Logo';
import { ariaLabels } from '@/features/shared/constants/ariaLables';
import { Text } from '@/features/shared/components/Text';
import { cn } from '@/features/shared/utils/cn';
import LogoSvg from '@/features/shared/components/LogoSvg';

type Props = {
  error?: string;
  isSubCategoryView?: boolean;
};

const ErrorPreview = ({ error, isSubCategoryView = false }: Props) => {
  return (
    <div
      className={cn(
        isSubCategoryView ? 'bg-primary-blue' : 'bg-primary-orange',
        'flex h-full  w-full flex-col items-center justify-center px-6'
      )}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <LogoSvg width={153} height={56} />

        <Text intent={'body'} className="pt-10 text-center  text-primary-white">
          {error ?? 'Geen data beschikbaar'}
        </Text>
      </div>
    </div>
  );
};

export default ErrorPreview;
