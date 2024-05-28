import { Button } from '@/features/shared/components/Button';
import { cn } from '@/features/shared/utils/cn';
import { Text } from '../../../shared/components/Text';
import Logo from '@/features/shared/components/Logo';
import { ariaLabels } from '@/features/shared/constants/ariaLables';
import ArrowBack from '../../../../../public/visuals/icons/arrow-back.svg';
import Link from 'next/link';

interface Props {
  isSubCategoryView: boolean;
  handleBack: () => void;
}

const AboutSection = ({ isSubCategoryView, handleBack }: Props) => {
  return (
    <section className={cn(`relative z-10 sm:h-full md:h-full`)}>
      <div className="absolute p-6">
        <Logo aria-hidden={true} aria-label={ariaLabels.logo} />
      </div>
      <div
        className={cn(
          isSubCategoryView ? 'bg-primary-blue' : 'bg-primary-orange',
          'flex h-[38.125rem] w-full flex-col justify-between  overflow-auto sm:h-full md:h-[27.75rem] md:flex-row'
        )}
      >
        <div className="flex animate-slidesFromLeft flex-col items-center justify-center p-20 sm:px-10">
          <Text className={'text-primary-white'} intent={'body'}>
            <Link
              className="underline"
              href="https://www.podiumkunst.net/"
              target="_blank"
            >
              Podiumkunst.net
            </Link>{' '}
            verbindt de schatkamers van de Nederlandse podiumkunsten en stelt
            deze open voor makers, onderzoekers en liefhebbers. Het doel is een
            volledig en toegankelijk digitaal overzicht van het Nederlandse
            podiumkunst-erfgoed, dat de geschiedenis van de Nederlandse
            podiumkunsten levend maakt en een inspiratiebron voor makers van nu
            en de toekomst kan vormen.
          </Text>
          <Text className={'pt-8 text-primary-white'} intent={'body'}>
            Daarvoor gaat{' '}
            <Link
              className="underline"
              href="https://www.podiumkunst.net/"
              target="_blank"
            >
              Podiumkunst.net
            </Link>{' '}
            muziek- en theatercollecties onderbrengen in een netwerk van
            collecties dat toegankelijk is voor iedereen. De gegevens die je
            hier ziet zijn gegevens van collectiehoudende instellingen die
            deelnemen aan{' '}
            <Link
              className="underline"
              href="https://www.podiumkunst.net/"
              target="_blank"
            >
              Podiumkunst.net
            </Link>
            .
          </Text>
          <Button
            className={cn(
              isSubCategoryView ? 'text-primary-blue' : 'text-primary-orange',
              'z-10 mt-8 '
            )}
            onClick={handleBack}
            // aria-label={ariaLabels.goBack}
            intent={isSubCategoryView ? 'animatedSub' : 'animatedMain'}
            icon={
              <ArrowBack
                className={
                  'hidden group-hover:block group-hover:fill-primary-white'
                }
              />
            }
          >
            <Text
              className={'text-primary-white'}
              as={'span'}
              intent={isSubCategoryView ? 'buttonSub' : 'button'}
            >
              Terug
            </Text>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
