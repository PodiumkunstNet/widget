'use client';

import WidgetMainContainer from '@/features/widget/containers/WidgetMainContainer';
import { useSearchParams } from 'next/navigation';

export default function EmbedPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  if (!id) {
    return (
      <div className="flex h-screen items-center justify-center border-[1px] border-primary-orange">
        <div className="text-center">
          <p className="text-2xl font-semibold text-[#FF0000]">
            Geen code opgegeven
          </p>
        </div>
      </div>
    );
  }

  return <WidgetMainContainer isSubCategoryView={false} />;
}
