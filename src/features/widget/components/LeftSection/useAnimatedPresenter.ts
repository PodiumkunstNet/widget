'use client';
// import { useRouter } from 'next/navigation';
import useAnimatedRouter from '../../hooks/useAnimatedRouter';

export const useAnimatedPresenter = () => {
  // const router = useRouter();
  const { animatedBackRoute } = useAnimatedRouter();

  const handleGoBack = () => {
    // router.back();
    animatedBackRoute();
  };

  return {
    handleGoBack,
  };
};
