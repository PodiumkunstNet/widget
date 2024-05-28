'use client';
import CodeInput from '@/features/configurator/components/CodeInput/CodeInput';
import { Text } from '@/features/shared/components/Text';
import CopyCode from '@/features/configurator/components/CopyCode/CopyCode';
import Preview from '@/features/configurator/components/Preview/Preview';
import Radio from '@/features/configurator/components/Radio/Radio';
import {
  SizeValue,
  useSizeConfigurator,
} from '@/features/configurator/hooks/useSizeConfigurator';
import { cn } from '@/features/shared/utils/cn';
import Logo from '@/features/shared/components/Logo';
import { ariaLabels } from '@/features/shared/constants/ariaLables';

export default function ConfigurePage() {
  const { id, setID, size, setSize, copied, setCopied, getEmbedCode } =
    useSizeConfigurator();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-6 align-middle configxl:flex-row configxl:justify-start">
      <div className="absolute left-0 top-0 pl-6 pr-[50px] pt-6 text-primary-black">
        <Logo aria-hidden={true} aria-label={ariaLabels.logo} dark={true} />
      </div>
      <div className="ml-[50px] mt-[30px] flex w-full max-w-[400px] flex-1 flex-col configxl:px-6">
        <div className="mb-5 flex flex-col items-center justify-center  align-middle sm:w-[90%]">
          <label htmlFor="code">
            <Text intent="h2">Identifier</Text>
          </label>
          <CodeInput
            value={id}
            onChange={(text) => {
              setCopied(false);
              setID(text);
            }}
          />
        </div>

        <div className="mb-5 flex flex-col items-center justify-center align-middle">
          <Text intent="h2" className="mb-6">
            Selecteer je formaat
          </Text>
          <div
            className={
              'flex flex-row sm:flex-col md:flex-row configxl:flex-col'
            }
          >
            {[
              SizeValue.small,
              SizeValue.medium,
              SizeValue.large,
              SizeValue.fill,
            ].map((option) => (
              <Radio
                key={option}
                option={option}
                selected={option === size}
                onChange={() => {
                  setCopied(false);
                  setSize(option);
                }}
              />
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-col items-center justify-center align-middle sm:w-[90%]">
          <label htmlFor="embedCode">
            <Text intent="h2" className="mb-6">
              Embed code
            </Text>
          </label>
          <CopyCode
            disabled={!id}
            getCode={getEmbedCode}
            onCopy={() => setCopied(true)}
            copied={copied}
          />
        </div>
      </div>
      <div
        className={cn(
          size === SizeValue.fill ? 'h-full w-full flex-1' : '',
          'flex  sm:w-[90%]'
        )}
      >
        <Preview getCode={getEmbedCode} id={id} />
      </div>
    </div>
  );
}
