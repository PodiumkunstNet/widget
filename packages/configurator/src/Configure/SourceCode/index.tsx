import { Button, Stack, Textarea } from "@mantine/core"
import { IconCheck, IconCopy } from "@tabler/icons-react"

interface Props {
	source: string
	onCopy: () => void
	copied: boolean
	disabled?: boolean
}
export function SourceCode({ source, onCopy, copied, disabled }: Props) {
	return (
		<Stack>
			<Textarea id="embedCode" rows={4} readOnly value={source} />
			<Button
				type="button"
				disabled={disabled}
				onClick={() => {
					navigator.clipboard.writeText(source)
					onCopy()
				}}
				leftSection={copied ? <IconCheck /> : <IconCopy />}
			>
				{copied ? "Gekopieerd" : "Kopieer code"}
			</Button>
		</Stack>
	)
}
