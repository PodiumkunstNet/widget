import CopyIcon from '@/features/shared/components/CopyIcon';

interface Props {
  getCode: () => string;
  onCopy: () => void;
  copied: boolean;
  disabled?: boolean;
}
const CopyCode = ({ getCode, onCopy, copied, disabled }: Props) => {
  return (
    <>
      <textarea
        id="embedCode"
        className="mb-6 w-full rounded-[4px] border-[1px] border-primary-orange p-3 font-euclid text-sm font-thin leading-[24px] outline-none configxl:w-[250px]"
        rows={4}
        readOnly
        value={getCode()}
      />
      <button
        type="button"
        disabled={disabled}
        className="flex flex-row justify-center border-[1px] border-primary-orange bg-primary-orange px-3 py-2 align-middle font-euclid text-sm font-bold text-primary-white hover:bg-primary-white hover:text-primary-orange disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary-orange disabled:hover:text-primary-white"
        onClick={() => {
          navigator.clipboard.writeText(getCode());
          onCopy();
        }}
      >
        <span className="mr-[8px]">{copied ? '✅' : <CopyIcon />}</span>
        <span>{copied ? 'Gekopieerd' : 'Kopieer'}</span>
      </button>
    </>
  );
};

export default CopyCode;
