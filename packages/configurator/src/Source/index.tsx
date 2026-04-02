import { useSearchParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { queryWidgetByIri } from "@widget/useGridData/useWidgetByIri"
import { MissingKeys } from "./MissingKeys"
import {
	Anchor,
	Box,
	Button,
	Group,
	Loader,
	Paper,
	Stack,
	Text,
	Title,
	Table,
	ScrollArea,
	Tooltip,
	Popover,
	Checkbox,
	Divider,
} from "@mantine/core"
import { useEffect, useMemo, useState } from "react"
import { JsonModal } from "./json-modal"
import { TilePreview } from "./TilePreview"
import { State } from "../state"

import { type Term } from "@widget/types"
import { type Tile } from "@widget/types/grid"
import { type MappedData } from "@widget/useGridData/types"
import { WidgetType } from "@widget/types/widget"
import { mappers } from "@widget/useGridData/mappers"

interface Data {
	mapped: MappedData,
	raw: { [key: string]: Term }[]
}

export function Source({ state }: { state: State }) {
	/** Set the --color-current var in CSS for the tiles to render with color */
	useEffect(() => {
		document.documentElement.style.setProperty(
			"--color-current",
			state.primaryColor,
		)
	}, [state.primaryColor])

	const [params] = useSearchParams()
	const iri = params.get("id") ?? ""
	const maxTiles = Number(params.get("maxTiles") ?? "50")
	// Read subtype from URL; default to 'work' if not provided or invalid
	const type = ensureWidgetType(params.get("type")) ?? WidgetType.Work

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["validate-initial", iri, maxTiles, type],
		enabled: !!iri,
		queryFn: async (): Promise<Data | undefined> => {
			if (!iri) return

			const bindings = await queryWidgetByIri(decodeURI(iri), type)
			if (!bindings) return
			const sliced = bindings.slice(0, maxTiles)

			const mappingFunction = mappers[type]
			const mappedData = mappingFunction(sliced)
			if (!mappedData) {
				throw new Error("Mapping error")
			}

			return { mapped: mappedData, raw: bindings }
		},
	})

	const [jsonOpen, setJsonOpen] = useState(false)

	// Column visibility state (persisted in localStorage)
	const allColumns = [
		"preview",
		"type",
		"key",
		"value",
		"sourceKey",
		"sourceValue",
		"subType",
		"urlId",
	] as const
	type ColumnId = (typeof allColumns)[number]
	const [visibleCols, setVisibleCols] = useState<Record<ColumnId, boolean>>({
		preview: true,
		sourceKey: true,
		key: false,
		sourceValue: true,
		value: false,
		type: true,
		subType: true,
		urlId: true,
	})

	const toggleCol = (id: ColumnId) =>
		setVisibleCols((s) => ({ ...s, [id]: !s[id] }))

	const columns = useMemo(
		() => [
			{
				id: "preview" as const,
				label: "Preview",
				width: "10%",
				render: (item: any) => <TilePreview item={item} />,
			},
			{
				id: "type" as const,
				label: "Type",
				width: "10%",
				render: (item: any) => item.type,
			},
			{
				id: "key" as const,
				label: "Key",
				width: "20%",
				render: (item: any) => {
					const k = item?.key
					const isEmpty =
						k == null || (typeof k === "string" && k.trim() === "")
					return isEmpty ? (
						<Text c="red">Titel niet gedefinieerd</Text>
					) : (
						<code>{k}</code>
					)
				},
			},
			{
				id: "value" as const,
				label: "Value",
				width: "24%",
				render: (item: any) => {
					const rawVal = item.value ?? "-"
					let display =
						typeof rawVal === "string"
							? rawVal.replace(/\s+/g, " ").trim()
							: String(rawVal)
					if (display.length > 50) display = display.slice(0, 50) + "…"
					return (
						<Tooltip label={rawVal} multiline maw={400} withArrow>
							<span
								style={{
									display: "block",
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis",
									maxWidth: "100%",
								}}
							>
								{display}
							</span>
						</Tooltip>
					)
				},
			},
			{
				id: "sourceKey" as const,
				label: "Source key",
				width: "16%",
				render: (item: any) =>
					item.sourceKey ? (
						<code>{item.sourceKey}</code>
					) : (
						<Text size="xs" c="dimmed">
							?
						</Text>
					),
			},
			{
				id: "sourceValue" as const,
				label: "Source value",
				width: "16%",
				render: (item: Tile) => {
					let originalValue = data?.raw[0][item.sourceKey!]?.value
					if (originalValue == null) originalValue = ""
					let value = originalValue
					if (value.length > 50) value = value.slice(0, 50) + "…"

					return (
						<Tooltip label={originalValue} multiline maw={400} withArrow>
							<span
								style={{
									display: "block",
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis",
									maxWidth: "100%",
								}}
							>
								{value}
							</span>
						</Tooltip>
					)
				},
			},
			{
				id: "subType" as const,
				label: "SubType",
				width: "10%",
				render: (item: any) => (
					<Stack>
						
						{item.subType && (
							<Button
								component={Link}
								to={`/validate?id=${encodeURIComponent(
									item.id,
								)}&type=${encodeURIComponent(item.subType)}`}
								variant="light"
								size="xs"
							>
								{item.subType}
							</Button>
						)}
					</Stack>
				),
			},
			{
				id: "urlId" as const,
				label: "URL / ID",
				width: "20%",
				render: (item: any) => {
					if (item.url) {
						return (
							<>
								<Anchor
									href={item.url}
									target="_blank"
									rel="noreferrer"
								>
									{item.url}
								</Anchor>
							</>
						)
					}
					const idStr = typeof item.id === "string" ? item.id : undefined
					let isUrl = false
					if (idStr) {
						try {
							// Using the URL constructor to validate
							new URL(idStr)
							isUrl = true
						} catch {}
					}
					if (isUrl && idStr) {
						return (
							<>
								<Anchor href={idStr} target="_blank" rel="noreferrer">
									{item.id}
								</Anchor>
							</>
						)
					}
					return idStr ? (
						<>
							<Text size="xs" c="dimmed" truncate>
								{item.id}
							</Text>
						</>
					) : (
						<Text size="xs" c="dimmed">
							-
						</Text>
					)
				},
			},
		],
		[data],
	)

	if (data == null) return null

	return (
		<Stack gap="xl">
			<Group justify="space-between">
				<Group gap="sm">
					<Button component={Link} to="/" variant="light">
						Terug naar configurator
					</Button>
				</Group>
				<Title order={2}>
					Brondata <i>{getRawValue(data, "title")}</i>{" "}
					<Text span c="dimmed" size="sm">
						({type})
					</Text>
				</Title>
				<Group gap="xs">
					<Popover position="bottom-end" shadow="md" withArrow>
						<Popover.Target>
							<Button variant="light">Kolommen</Button>
						</Popover.Target>
						<Popover.Dropdown>
							<Stack gap="xs">
								<Text fw={500} size="sm">
									Toon kolommen
								</Text>
								<Divider my="xs" />
								{allColumns.map((id) => (
									<Checkbox
										key={id}
										label={
											columns.find((c) => c.id === id)?.label ?? id
										}
										checked={visibleCols[id]}
										onChange={() => toggleCol(id)}
									/>
								))}
							</Stack>
						</Popover.Dropdown>
					</Popover>
					<Button
						variant="default"
						disabled={!data || isLoading || isError}
						onClick={() => setJsonOpen(true)}
					>
						Bekijk JSON
					</Button>
				</Group>
			</Group>
			<Paper
				pt="md"
				p="md"
				withBorder
				style={{ flex: 1, display: "flex", flexDirection: "column" }}
			>
				<Stack
					gap="sm"
					style={{
						flex: 1,
						display: "flex",
						flexDirection: "column",
						minHeight: 0,
					}}
				>
					<Text size="sm" my="xs">
						IRI:{" "}
						<Anchor
							href={iri.startsWith("http") ? iri : undefined}
							target="_blank"
							rel="noreferrer"
						>
							{iri}
						</Anchor>
					</Text>
					{isLoading && (
						<Group>
							<Loader size="sm" />
							<Text>Data laden...</Text>
						</Group>
					)}
					{isError && (
						<Text c="red">
							Fout bij ophalen data: {(error as Error)?.message}
						</Text>
					)}
					{!isLoading && !isError && !iri && (
						<Text c="dimmed">Geen IRI opgegeven.</Text>
					)}
					{!isLoading && !isError && iri && data && (
						<Box
							style={{
								flex: 1,
								display: "flex",
								flexDirection: "column",
								minHeight: 0,
							}}
						>
							{(!data.mapped || data.mapped.items.length === 0) && (
								<Text c="dimmed">Geen items gevonden.</Text>
							)}
							{data.mapped && data.mapped.items.length > 0 && (
								<ScrollArea offsetScrollbars style={{ flex: 1 }}>
									<Table
										striped
										highlightOnHover
										withTableBorder
										withColumnBorders
										stickyHeader
										stickyHeaderOffset={0}
									>
										<Table.Thead>
											<Table.Tr>
												{columns
													.filter((c) => visibleCols[c.id])
													.map((c) => (
														<Table.Th
															key={c.id}
															style={{ width: c.width }}
														>
															{c.label}
														</Table.Th>
													))}
											</Table.Tr>
										</Table.Thead>
										<Table.Tbody>
											{data.mapped?.items.map((item) => (
												<Table.Tr key={item.key + item.id}>
													{columns
														.filter((c) => visibleCols[c.id])
														.map((c) => (
															<Table.Td
																key={c.id}
																style={
																	c.id === "value"
																		? { padding: "4px 8px" }
																		: undefined
																}
															>
																{c.render(item)}
															</Table.Td>
														))}
												</Table.Tr>
											))}
										</Table.Tbody>
									</Table>
								</ScrollArea>
							)}

							<MissingKeys type={type} raw={data.raw} />
						</Box>
					)}
				</Stack>
			</Paper>
			<JsonModal
				opened={jsonOpen}
				onClose={() => setJsonOpen(false)}
				data={data ?? null}
			/>
		</Stack>
	)
}

function getRawValue(data: Data, key: string): string {
	return data.raw[0][key].value
}

/**
 * Parse a string into a `WidgetType` (case-insensitive), for example from a query param.
 */
function ensureWidgetType(type?: string | null) {
	type = type?.toLowerCase()

	if (type === "agent") return WidgetType.Agent
	if (type === "work") return WidgetType.Work
	if (type === "worksforagent") return WidgetType.WorksForAgent
	if (type === "category") return WidgetType.Category
	if (type === "manifestations") return WidgetType.Manifestation
}
