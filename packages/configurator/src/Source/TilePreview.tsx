import { type Tile } from "@widget/types/grid"
import { useMemo } from "react"
import { getTileComponent } from "@widget/pages/Grid/index"

/**
 * Renders the real widget tile components (GenericTile, InformationTile, ExternalLinkTile)
 * inside an isolated mini environment suitable for a table cell preview.
 * - Provides State & Dispatch contexts so components using them won't crash
 * - Disables pointer events to avoid navigation or overlay behavior inside the preview
 * - Scales the tile down slightly to fit the table layout
 */
export function TilePreview({ item }: { item: Tile }) {
	// Memoize a copy so we can tweak without mutating original
	const previewItem = useMemo(() => ({ ...item }), [item])

	const TileComponent = getTileComponent(previewItem.type)

	return (
		<ul
			className="container small"
			style={{
				border: "2px solid var(--color-current)",
				listStyle: "none",
				padding: 0,
				margin: 0,
				width: 120,
				height: 120,
				overflow: "hidden",
			}}
			onClick={ev => {
				ev.preventDefault()
				ev.stopPropagation()
			}}
		>
			<TileComponent item={previewItem} />
		</ul>
	)
}
