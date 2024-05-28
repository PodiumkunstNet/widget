import CopyIcon from '@/features/shared/components/CopyIcon';

interface Props {
  onChange: (text: string) => void;
  value: string;
}
const CodeInput = ({ onChange, value }: Props) => {
  return (
    <input
      className="h-[53px] w-full border-b border-primary-orange font-montserrat font-extralight leading-[53px] outline-none configxl:w-[250px]"
      id="code"
      type="text"
      placeholder="Voer iri in"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default CodeInput;
