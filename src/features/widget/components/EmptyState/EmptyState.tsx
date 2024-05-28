'use client';

import { Text } from '@/features/shared/components/Text';
import { Button } from '@/features/shared/components/Button';
import ArrowBack from '../../../../../public/visuals/icons/arrow-back.svg';

type Props = {
  handleBack: () => void;
  isSubCategoryView?: boolean;
};

const EmptyState = ({ isSubCategoryView = true, handleBack }: Props) => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <Text intent={'body'} className="pb-10 text-center text-primary-white">
        Er is geen informatie beschikbaar, ga terug naar vorig niveau
      </Text>
      <Button
        icon={
          <ArrowBack className={'fill-primary-white hover:fill-primary-blue'} />
        }
        className={'z-10 py-1 pl-2 pr-3'}
        intent={isSubCategoryView ? 'sub' : 'main'}
        onClick={handleBack}
      >
        <Text
          as={'span'}
          intent={isSubCategoryView ? 'buttonSub' : 'button'}
          className={'text-primary-white '}
        >
          Terug
        </Text>
      </Button>
    </div>
  );
};

export default EmptyState;
