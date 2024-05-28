import { cn } from '@/features/shared/utils/cn';

interface Props {
  onChange: (option: string | undefined) => void;
  option?: string;
  selected?: boolean;
}
const Radio = ({ option, selected, onChange }: Props) => {
  return (
    <label
      className={cn(
        selected ? 'border-primary-orange bg-[#FFF2E9]' : 'border-[#EFF1FE]',
        'mr-6 flex min-w-[160px] flex-row items-center rounded-[2px] border-[1px] p-4 font-euclid text-xs font-extralight hover:cursor-pointer hover:border-primary-orange sm:mb-2 configxl:mb-2 configxl:mr-0'
      )}
    >
      <div
        className={cn(
          selected ? 'border-primary-orange' : 'border-[#0000008A]',
          'mr-2 flex h-4 w-4 items-center justify-center rounded-full border-[1.5px]'
        )}
      >
        <div
          className={cn(
            selected ? 'bg-primary-orange' : 'hidden bg-[#0000008A]',
            'h-[7px] w-[7px] rounded-full'
          )}
        ></div>
      </div>
      <input
        className={'invisible hidden'}
        type="radio"
        name="size"
        value={option}
        checked={selected}
        onChange={() => {
          onChange(option);
        }}
      />
      <span className={'text-[14px] font-light'}>{option}</span>
    </label>
  );
};

export default Radio;
