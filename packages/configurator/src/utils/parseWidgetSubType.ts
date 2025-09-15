import { WidgetSubType } from "@widget/types/mainWidgetData"

/**
 * Map the query param to a WidgetSubType; return undefined when it doesn't match.
 */
export function parseWidgetSubType(
  input: string | null | undefined,
): WidgetSubType | undefined {
  const v = (input ?? "").toLowerCase()
  switch (v) {
    case "agent":
      return WidgetSubType.Agent
    case "category":
      return WidgetSubType.Category
    case "manifestations":
      return WidgetSubType.Manifestation
    case "worksforagent":
      return WidgetSubType.WorksForAgent
    case "work":
      return WidgetSubType.Work
    default:
      return undefined
  }
}
