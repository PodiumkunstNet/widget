import { Text } from '@/features/shared/components/Text';
import { cn } from '@/features/shared/utils/cn';
import { GridItemType } from '../GridSection/GridSection';

type Props = {
  item: GridItemType;
  isSubCategoryView?: boolean;
};

const InfoSection = ({ isSubCategoryView, item }: Props) => {
  return (
    <section
      className={cn(
        isSubCategoryView ? 'border-primary-blue' : 'border-primary-orange',
        `flex grow flex-col items-center border border-t-0 border-solid sm:h-[calc(100%-200px)] md:h-full`
      )}
    >
      {/* This div is used to create the animation of a bar sliding to the top when the page is 'opened' */}
      <div
        className={cn(
          isSubCategoryView ? 'border-primary-blue' : 'border-primary-orange',
          'border-b-solid w-full border-b',
          'animate-slidesUpInfoBar'
        )}
      />
      <div
        className={cn(
          'animate-slidesUp',
          'flex h-full flex-col items-center p-10 sm:justify-start  md:justify-center lg:justify-center'
        )}
      >
        <Text
          intent={'subtitle'}
          as={'p'}
          className={cn(
            isSubCategoryView ? 'text-primary-blue' : 'text-primary-orange',
            `mb-1 text-center`
          )}
        >
          Informatie
        </Text>
        <Text
          intent={'h1'}
          as={'h2'}
          className={'mb-4 text-center text-text-primary'}
        >
          {item?.value}
        </Text>
        <Text
          intent={'body'}
          as={'p'}
          className={'text-center text-text-primary'}
        >
          {item?.note}
        </Text>
      </div>
    </section>
  );
};

export default InfoSection;
