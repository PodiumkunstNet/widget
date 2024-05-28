'use client';
import { useRouter } from 'next/navigation';

export const usePresenter = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return {
    handleGoBack,
  };
};
