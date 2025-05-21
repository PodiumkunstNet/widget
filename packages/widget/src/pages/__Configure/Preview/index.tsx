'use client';

import { useWidgetByIri } from '../../../hooks/useWidgetByIri';
import { WidgetSubType } from '../../../types/mainWidgetData';
import EmptyPreview from './EmptyPreview';
import ErrorPreview from './ErrorPreview';

interface Props {
  getCode: () => string;
  id: string;
}
const Preview = ({ getCode, id }: Props) => {
  const { data } = useWidgetByIri(id, WidgetSubType.Work);

  if (!id) {
    return (
      <div className={'container h-[444px] w-full max-w-[900px]'}>
        <EmptyPreview />
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className={'container h-[444px] w-full max-w-[900px]'}>
        <ErrorPreview
          error={'Helaas is de widget op dit moment niet beschikbaar.'}
        />
      </div>
    );
  }

  return (
    <div
      className="block h-full w-full"
      dangerouslySetInnerHTML={{ __html: getCode() }}
    />
  );
};

export default Preview;
