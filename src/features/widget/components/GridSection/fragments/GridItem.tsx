import { GRID_CATEGORIES } from '@/features/widget/types/categories';
import { GridItemType } from '../GridSection';
import { Text } from '@/features/shared/components/Text';
import { cn } from '@/features/shared/utils/cn';
import useGenerateUrlForTile from '@/features/widget/hooks/useGenerateUrlForTile';
import AnimatedLink from '../../AnimatedLink';
import useSessionStorageManager from '@/features/shared/hooks/useSessionStorage';

type Props = {
  item: GridItemType;
  isSubCategoryView?: boolean;
  isInformation?: boolean;
  handleInfoOverlay: (item: GridItemType) => void;
  rowHeight?: number;
};

const GridItem = ({
  item,
  isSubCategoryView,
  isInformation,
  handleInfoOverlay,
  rowHeight,
}: Props) => {
  const { url, isExternal } = useGenerateUrlForTile(isSubCategoryView, item);
  const { setTitle } = useSessionStorageManager();
  const isStatic = item?.type === GRID_CATEGORIES.static;

  const storeTitleInCache = () => {
    const title = item.key ? `${item.key} ${item.value}` : item.value;
    setTitle(`${item?.id}-${item.subType}`, title);
  };

  const dynamicStyle = rowHeight
    ? { height: `${rowHeight}px`, maxHeight: `${rowHeight}px` }
    : {};

  const commonClasses = cn(
    isSubCategoryView
      ? 'border-primary-blue text-primary-blue hover:bg-primary-blue'
      : 'border-primary-orange text-primary-orange hover:bg-primary-orange',
    isStatic &&
      cn(
        isSubCategoryView
          ? 'hover:bg-primary-blue hover:bg-opacity-10'
          : 'hover:bg-primary-orange hover:bg-opacity-10'
      ),
    'flex grow flex-col content-center justify-center border border-solid bg-primary-white group p-4',
    'transition duration-300 ease-out hover:ease-in'
  );

  const content = (
    <>
      <Text
        intent="subtitle"
        as="p"
        className={cn(
          isStatic
            ? isSubCategoryView
              ? 'group-hover:text-primary-blue'
              : 'group-hover:text-primary-black'
            : 'group-hover:text-primary-white',
          isSubCategoryView ? 'text-primary-blue ' : 'text-primary-orange',
          'mb-1 line-clamp-1 break-words text-center'
        )}
      >
        {item?.key}
      </Text>
      <Text
        intent={'h2'}
        as={'h2'}
        className={cn(
          isStatic
            ? isSubCategoryView
              ? 'group-hover:text-primary-blue'
              : 'group-hover:text-primary-black'
            : 'group-hover:text-primary-white',
          'line-clamp-3 break-words text-center text-text-primary'
        )}
      >
        {item?.value}
      </Text>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
        style={dynamicStyle}
      >
        {content}
      </a>
    );
  } else if (isInformation) {
    return (
      <div
        className={`${commonClasses} cursor-pointer`}
        onClick={() => {
          handleInfoOverlay(item);
        }}
        style={dynamicStyle}
      >
        {content}
      </div>
    );
  } else if (isStatic) {
    return (
      <div style={dynamicStyle} className={`${commonClasses} cursor-default`}>
        {content}
      </div>
    );
  } else {
    return (
      <AnimatedLink
        href={url ?? '/'}
        classes={commonClasses}
        handleClick={storeTitleInCache}
        style={dynamicStyle}
      >
        {content}
      </AnimatedLink>
    );
  }
};

export default GridItem;
