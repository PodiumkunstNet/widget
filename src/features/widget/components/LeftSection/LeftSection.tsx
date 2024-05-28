'use client';

import Logo from '@/features/shared/components/Logo';
import ArrowBack from '../../../../../public/visuals/icons/arrow-back.svg';
// Lg
import OutliningTopLg from '../../../../../public/visuals/outlining/outlining_top_lg.svg';
import OutliningBottomLg from '../../../../../public/visuals/outlining/outlining_bottom_lg.svg';

// Md
import OutliningTopMd from '../../../../../public/visuals/outlining/outlining_top_md.svg';
import OutliningBottomMd from '../../../../../public/visuals/outlining/outlining_bottom_md.svg';

// Sm
import OutliningTopSm from '../../../../../public/visuals/outlining/outlining_top_sm.svg';
import OutliningBottomSm from '../../../../../public/visuals/outlining/outlining_bottom_sm.svg';

import OutliningRight from '../../../../../public/visuals/outlining/outlining-right.svg';

import { Text } from '../../../shared/components/Text';
import { Button } from '@/features/shared/components/Button';
import { cn } from '@/features/shared/utils/cn';
import { ariaLabels } from '@/features/shared/constants/ariaLables';
import { useState, useEffect } from 'react';

type Props = {
  isSubCategoryView: boolean;
  showBackButton?: boolean;
  showBorder?: boolean;
  handleBack: () => void;
  handleBackHome?: () => void;
  title: string;
  handleViewAboutOverlay: () => void;
  savedTitle: string;
  showBackHomeButton?: boolean;
};

const LeftSection = ({
  isSubCategoryView,
  showBorder,
  showBackButton,
  handleBack,
  title,
  handleViewAboutOverlay,
  savedTitle,
  handleBackHome,
  showBackHomeButton,
}: Props) => {
  // 'use client' alone is not sufficient to ensure client side rendering in this case
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  const mediumClasses = cn(
    'relative pt-4',
    isClient && window.devicePixelRatio < 2
      ? 'left-[-0.13em]'
      : 'left-[-0.09em]'
  );

  return (
    <section
      className={cn(
        isSubCategoryView ? 'bg-primary-blue' : 'bg-primary-orange',
        showBorder && 'border-r border-solid border-primary-white',
        `relative h-[277px] min-h-[277px] w-full p-6 md:h-auto md:w-[239px] md:min-w-[239px] lg:h-auto lg:w-[32%] lg:min-w-[32%]`
      )}
    >
      <div className="flex justify-between">
        <div onClick={handleViewAboutOverlay} className="z-10 cursor-pointer">
          <Logo aria-hidden={true} aria-label={ariaLabels.logo} />
        </div>
        <div className="flex flex-row flex-wrap-reverse justify-end gap-2">
          {showBackHomeButton && (
            <Button
              className={cn(
                'animate-slidesFromRight',
                'z-10 border-b-2 border-primary-white p-1'
              )}
              intent={'sub'}
              onClick={handleBackHome}
            >
              <Text
                as={'span'}
                intent={'buttonSub'}
                className={'text-primary-white '}
              >
                Naar start
              </Text>
            </Button>
          )}
          {showBackButton && (
            <Button
              icon={
                <ArrowBack
                  className={'fill-primary-white hover:fill-primary-blue'}
                />
              }
              className={cn(
                'animate-slidesFromRight',
                'z-10 border-b-2 border-primary-white p-1'
              )}
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
          )}
        </div>
      </div>

      {/* Lg block */}
      <div className="absolute inset-0  hidden w-[288px] items-center justify-center lg:flex">
        <div className="relative top-6 max-w-[240px]">
          <OutliningTopLg width={246} height={13} className={'relative'} />
          <div className="relative left-[0.34em] pt-4">
            <Text
              as={'h1'}
              intent={'h1'}
              className={
                'relative left-[-11.5px] break-words uppercase text-primary-white'
              }
            >
              {savedTitle && isSubCategoryView
                ? savedTitle
                : `Meer over ${title}`}
            </Text>
            <OutliningRight
              className="absolute right-0 top-[-0.5px]"
              // this is a hack to make the outlining right align with the outlining top
              height={'101%'}
            />
          </div>

          <OutliningBottomLg
            width={246}
            height={48}
            className={'relative top-[-1px]'}
          />
        </div>
      </div>

      {/* Md block */}
      <div className="absolute inset-0  hidden items-center justify-center md:flex lg:hidden">
        <div className="relative top-6 max-w-[191px]">
          <OutliningTopMd width={190} height={13} className={'relative'} />
          <div className={mediumClasses}>
            <Text
              as={'h1'}
              intent={'h1'}
              className={
                'relative left-[-11.5px] break-words uppercase text-primary-white'
              }
            >
              {savedTitle && isSubCategoryView
                ? savedTitle
                : `Meer over ${title}`}
            </Text>
            <OutliningRight
              className="absolute right-0 top-[-1px]"
              // this is a hack to make the outlining right align with the outlining top
              height={'101%'}
            />
          </div>
          <OutliningBottomMd
            width={190}
            height={47}
            className={'relative top-[-1px]'}
          />
        </div>
      </div>

      {/* Sm block */}
      <div className="absolute inset-0 flex items-center justify-center md:hidden lg:hidden">
        <div className="relative top-6 max-w-[312.5px]">
          <OutliningTopSm width={307} height={13} className={'relative '} />
          <div className="relative left-[-0.35em] min-w-[312px] pt-4">
            <Text
              as={'h1'}
              intent={'h1'}
              className={
                'relative left-[-4px] break-words uppercase text-primary-white'
              }
            >
              {savedTitle && isSubCategoryView
                ? savedTitle
                : `Meer over ${title}`}
            </Text>
            <OutliningRight
              className="absolute right-0 top-[-0.8px]"
              // this is a hack to make the outlining right align with the outlining top
              height={'101%'}
            />
          </div>
          <OutliningBottomSm
            width={307}
            height={47}
            className={'relative top-[-1px]'}
          />
        </div>
      </div>
    </section>
  );
};

export default LeftSection;
