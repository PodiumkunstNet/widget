import dynamic from 'next/dynamic';

import type { Metadata } from 'next';

const WidgetMainContainerNoSSR = dynamic(
  () => import('@/features/widget/containers/WidgetMainContainer'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Podiumkunst.net widget',
};

export default async function Page() {
  return <WidgetMainContainerNoSSR isSubCategoryView={true} />;
}
