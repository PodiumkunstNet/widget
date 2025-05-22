import { Button, Stack, Textarea } from "@mantine/core"
import { IconCheck, IconCopy } from "@tabler/icons-react"
import { useEffect, useState } from "react"

interface Props {
	source: string
	disabled?: boolean
}
export function SourceCode({ source, disabled }: Props) {
	const [copied, setCopied] = useState(false)
	useEffect(() => setCopied(false), [source])

	return (
		<Stack>
			<Textarea id="embedCode" rows={4} readOnly value={source} />
			<Button
				type="button"
				disabled={disabled}
				onClick={() => {
					navigator.clipboard.writeText(source)
					setCopied(true)
				}}
				leftSection={copied ? <IconCheck /> : <IconCopy />}
			>
				{copied ? "Gekopieerd" : "Kopieer code"}
			</Button>
		</Stack>
	)
}
