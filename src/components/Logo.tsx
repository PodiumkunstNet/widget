import { cn } from '../utils/cn';

const LogoSrc = '/public/PodiumkunstLogo-Large.png'
const LogoBlackSrc = '/public/PodiumkunstLogo-Large-Black.png'
const LogoSmallSrc = '/public/PodiumkunstLogo-Small.png'
const LogoSmallBlackSrc = '/public/PodiumkunstLogo-Small-Black.png'

interface LogoProps {
  dark?: boolean;
  large?: boolean;
}

// TODO do we want/need the `dark` and `large` prop, solve with 
// 	responsive CSS and/or SVG?

export function Logo({ dark = false, large = false }: LogoProps) {
  return (
    <>
      <div
        className={cn(
          large ? 'hidden md:block lg:block' : 'hidden',
          'min-w-[153px]'
        )}
      >
        <img
          src={dark ? LogoBlackSrc : LogoSrc}
          alt="Podiumkunst.net logo"
          width={153}
          height={56}
        />
      </div>

      <div
        className={cn(
          large ? 'block  md:hidden lg:hidden' : 'hidden md:block lg:block',
          'min-w-[89px]'
        )}
      >
        <img
          src={dark ? LogoBlackSrc : LogoSrc}
          alt="Podiumkunst.net logo"
          width={89}
          height={32}
        />
      </div>
      <div
        className={cn(
          large ? 'hidden  md:hidden lg:hidden' : 'block md:hidden lg:hidden',
          'min-w-[66px]'
        )}
      >
        <img
          src={dark ? LogoSmallBlackSrc : LogoSmallSrc}
          alt="Podiumkunst.net logo"
          width={66}
          height={24}
        />
      </div>

      {/* Remove this code when the svgs are ready or when we decide to use pngs as permanent solution */}
      {/* <LogoSvg width={89} height={32} className={'hidden md:block lg:block'} />
      <LogoSvgSm
        width={66}
        height={24}
        className={'block md:hidden lg:hidden'}
      /> */}
    </>
  );
};
