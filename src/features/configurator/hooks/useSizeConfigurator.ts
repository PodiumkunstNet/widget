import { useState } from 'react';
import { useOrigin } from './useOrigin';
import { WIDGET_SUB_TYPES } from '@/features/widget/types/mainWidgetData';
import { IFRAME_ID } from '@/features/shared/constants/mainConstants';

export enum SizeValue {
  small = 'Small',
  medium = 'Medium',
  large = 'Large',
  fill = 'Fill',
}

const accessibilityTitle = 'Podiumkunst Widget';

function getIFrame(
  url: string,
  width: number | string,
  height: number | string
) {
  return `<iframe width="${width}" height="${height}" id=${IFRAME_ID} title=${accessibilityTitle} src="${url}" frameborder="0"></iframe>`;
}

export const useSizeConfigurator = () => {
  const [id, setID] = useState<string>('');
  const [size, setSize] = useState<SizeValue>(SizeValue.large);
  const [copied, setCopied] = useState(false);
  const sizes = {
    [SizeValue.small]: { width: 360, height: 610 },
    [SizeValue.medium]: { width: 600, height: 444 },
    [SizeValue.large]: { width: 900, height: 444 },
    [SizeValue.fill]: { width: '100%', height: '100%' },
  };
  const currentUrl = useOrigin(`widget?id=${id}&type=${WIDGET_SUB_TYPES.work}`);

  const getEmbedCode = () => {
    const iframe = getIFrame(currentUrl, sizes[size].width, sizes[size].height);

    // if size is fill we want to keep a min-height of 444px
    // and a min-width of 360px
    if (size === SizeValue.fill) {
      return `<style>iframe#${IFRAME_ID} {min-height: 444px;min-width: 360px;}@media (max-width: 599px) {iframe#pk-widget {min-height: 610px;}}</style>${iframe}`;
    }

    return iframe;
  };

  return {
    id,
    setID,
    size,
    setSize,
    sizes,
    copied,
    setCopied,
    getEmbedCode,
  };
};
