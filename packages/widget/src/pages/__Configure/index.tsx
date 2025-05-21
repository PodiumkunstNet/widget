import { Logo } from "../../components/Logo"
import { ariaLabels } from "../../constants/ariaLables"
import { cn } from "../../utils/cn"
import CodeInput from "./CodeInput"
import CopyCode from "./CopyCode"
import Preview from "./Preview"
import Radio from "./Radio"
import { SizeValue, useSizeConfigurator } from "./useSizeConfigurator"

export function Configure() {
	const { id, setID, size, setSize, copied, setCopied, getEmbedCode } =
		useSizeConfigurator()

	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center py-6 align-middle configxl:flex-row configxl:justify-start">
			<div className="absolute left-0 top-0 pl-6 pr-[50px] pt-6 text-primary-black">
				<Logo aria-hidden={true} aria-label={ariaLabels.logo} dark={true} />
			</div>
			<div className="ml-[50px] mt-[30px] flex w-full max-w-[400px] flex-1 flex-col configxl:px-6">
				<div className="mb-5 flex flex-col items-center justify-center  align-middle sm:w-[90%]">
					<label htmlFor="code">
						<h2>Identifier</h2>
					</label>
					<CodeInput
						value={id}
						onChange={(text) => {
							setCopied(false)
							setID(text)
						}}
					/>
				</div>

				<div className="mb-5 flex flex-col items-center justify-center align-middle">
					<h2 className="mb-6">Selecteer je formaat</h2>
					<div
						className={
							"flex flex-row sm:flex-col md:flex-row configxl:flex-col"
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
									setCopied(false)
									setSize(option)
								}}
							/>
						))}
					</div>
				</div>

				<div className="mb-6 flex flex-col items-center justify-center align-middle sm:w-[90%]">
					<label htmlFor="embedCode">
						<h2 className="mb-6">Embed code</h2>
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
					size === SizeValue.fill ? "h-full w-full flex-1" : "",
					"flex  sm:w-[90%]",
				)}
			>
				<Preview getCode={getEmbedCode} id={id} />
			</div>
		</div>
	)
}
