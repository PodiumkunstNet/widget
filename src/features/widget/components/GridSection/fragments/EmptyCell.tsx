import { cn } from '@/features/shared/utils/cn';

type Props = {
  variant?: 'blue' | 'orange';
};

const EmptyCell = ({ variant }: Props) => {
  return (
    <div
      className={cn(
        variant === 'blue' && 'bg-primary-blue',
        variant === 'orange' && ' bg-primary-orange',
        `flex  grow flex-col  p-4`
      )}
    />
  );
};

export default EmptyCell;
