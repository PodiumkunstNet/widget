'use client';
import { useRouter } from 'next/navigation';

export interface ExtendedDocument extends Document {
  startViewTransition?: any;
}

export default function useAnimatedRouter() {
  const router = useRouter();
  const viewTransitionsStatus = () => {
    const extendedDocument = document as ExtendedDocument;
    let status = "Opss, Your browser doesn't support View Transitions API";
    if (extendedDocument?.startViewTransition) {
      status = 'Yess, Your browser support View Transitions API';
    }
    return status;
  };
  // Navigate to the new route
  const animatedRoute = (url: string) => {
    const extendedDocument = document as ExtendedDocument;
    if (!extendedDocument.startViewTransition) {
      return router.push(url);
    } else {
      extendedDocument.startViewTransition(() => {
        router.push(url);
      });
    }
  };

  const animatedBackRoute = () => {
    const extendedDocument = document as ExtendedDocument;
    if (!extendedDocument.startViewTransition) {
      return router.back();
    } else {
      extendedDocument.startViewTransition(() => {
        router.back();
      });
    }
  };
  return { animatedRoute, animatedBackRoute, viewTransitionsStatus };
}
