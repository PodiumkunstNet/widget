import { useMemo } from "react"
import { Group Text, Badge } from "@mantine/core"
import { WidgetType } from "@widget/helpers"
import { WorkKey } from "@widget/types/work"
import { AgentKey } from "@widget/types/agent"

type Props = {
	type: WidgetType
	raw: unknown[] | undefined | null
}

export function MissingKeys({ type, raw }: Props) {
	const expectedKeys = useMemo<readonly string[] | null>(() => {
		switch (type) {
			case WidgetType.Work:
				return Object.values(WorkKey)
			case WidgetType.Agent:
				return Object.values(AgentKey)
			default:
				return null
		}
	}, [type])

	const missingKeys = useMemo<string[] | null>(() => {
		const first = (Array.isArray(raw) ? raw?.[0] : undefined) as
			| Record<string, unknown>
			| undefined
		if (!first || !expectedKeys) return null
		return expectedKeys.filter(
			(k) => !(k in first) || first[k] == null || first[k] === "",
		)
	}, [raw, expectedKeys])

	if (!expectedKeys) return null

	return (
		<Group mt="md" gap="xs">
			<Text size="sm" c="dimmed">
				Ontbrekende eigenschappen:
			</Text>
			{missingKeys && missingKeys.length > 0 ? (
				<Group gap="xs" wrap="wrap">
					{missingKeys.map((k) => (
						<Badge key={k} variant="outline">
							{k}
						</Badge>
					))}
				</Group>
			) : (
				<Text size="sm" c="teal">
					Alle verwachte keys aanwezig.
				</Text>
			)}
		</Group>
	)
}
