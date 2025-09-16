import { useMemo } from "react"
import { Group, Text, Badge } from "@mantine/core"
import { WidgetType } from "@widget/helpers"
import { WorkKey } from "@widget/types/work"
import { AgentKey } from "@widget/types/agent"
import { getTileLabel } from "@widget/types"

type Props = {
	type: WidgetType
	raw: unknown[] | undefined | null
}

export function MissingKeys({ type, raw }: Props) {
	const expectedKeys = useMemo<readonly { key: string, label: string }[]>(() => {
		switch (type) {
			case WidgetType.Work:
				return Object.values(WorkKey).map((key) => ({ key, label: getTileLabel(type, key) }))
			case WidgetType.Agent:
				return Object.values(AgentKey).map((key) => ({ key, label: getTileLabel(type, key) }))
			default:
				return []
		}
	}, [type])

	const missingKeys = useMemo<{ key: string, label: string }[]>(() => {
		const first = (Array.isArray(raw) ? raw?.[0] : undefined) as
			| Record<string, unknown>
			| undefined
		if (!first || !expectedKeys) return []
		return expectedKeys
			.filter(({ key: k }) => !(k in first) || first[k] == null || first[k] === "")
			// .map(({ key }) => ({ key, label: getTileLabel(type, key) }))
	}, [raw, expectedKeys])

	if (!expectedKeys) return null

	return (
		<Group mt="md" gap="xs">
			<Text size="sm" c="dimmed">
				Ontbrekende eigenschappen:
			</Text>
			{missingKeys && missingKeys.length > 0 ? (
				<Group gap="xs" wrap="wrap">
					{missingKeys.map((mk) => (
						<Badge key={mk.key} variant="outline" title={mk.key}>
							<Group gap="xs">
							<Text size="sm" c="gray" tt="lowercase">{mk.key}</Text>
							{mk.label}
							</Group>
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
