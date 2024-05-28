'use client';

import Image from 'next/image';

import LogoPngBlack from '../../../../public/PodiumkunstLogo-Large-Black.png';
import LogoPng from '../../../../public/PodiumkunstLogo-Large.png';
import LogoPngSmallBlack from '../../../../public/PodiumkunstLogo-Small-Black.png';
import LogoPngSmall from '../../../../public/PodiumkunstLogo-Small.png';
import { cn } from '../utils/cn';
import { Button } from './Button';

// import LogoSvg from '../../../../public/logo_transparant.svg';
// import LogoSvgSm from '../../../../public/logo_transparant_sm.svg';

interface LogoProps {
  dark?: boolean;
  large?: boolean;
}

const Logo = ({ dark = false, large = false }: LogoProps) => {
  return (
    <>
      <div
        className={cn(
          large ? 'hidden md:block lg:block' : 'hidden',
          'min-w-[153px]'
        )}
      >
        <Image
          src={dark ? LogoPngBlack : LogoPng}
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
        <Image
          src={dark ? LogoPngBlack : LogoPng}
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
        <Image
          src={dark ? LogoPngSmallBlack : LogoPngSmall}
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

export default Logo;
