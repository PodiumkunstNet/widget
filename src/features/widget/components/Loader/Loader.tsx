'use client';
import Image from 'next/image';

import LogoBig from '../../../../../public/logo_big.png';
import LogoSvg from '@/features/shared/components/LogoSvg';

const Loader = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-primary-orange px-6 ">
      <div className="block animate-pulse">
        {/* <Image
          src={LogoBig}
          alt="Podiumkunst.net logo"
          width={220}
          height={80}
        /> */}
        <LogoSvg />
      </div>
    </div>
  );
};

export default Loader;
