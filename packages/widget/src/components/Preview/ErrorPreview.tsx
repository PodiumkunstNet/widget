import { cn } from '../../utils/cn'
import { Text } from '../Text'
import LogoSvg from '../LogoSvg'

type Props = {
  error?: string;
  isSubCategoryView?: boolean;
};

const ErrorPreview = ({ error, isSubCategoryView = false }: Props) => {
  return (
    <div
      className={cn(
        isSubCategoryView ? 'bg-primary-blue' : 'bg-primary-orange',
        'flex h-full  w-full flex-col items-center justify-center px-6'
      )}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <LogoSvg width={153} height={56} />

        <Text intent={'body'} className="pt-10 text-center  text-primary-white">
          {error ?? 'Geen data beschikbaar'}
        </Text>
      </div>
    </div>
  );
};

export default ErrorPreview;
