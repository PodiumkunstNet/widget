/**
 * Utility for parsing IRIs and extracting a possible `type` parameter.
 * Returns a cleaned IRI without the type parameter, and the (lowercased) type when present.
 *
 * @param input The IRI or URL-like string to parse.
 * @returns An object containing the cleaned IRI and optional type.
 */
export function extractIriAndType(input: string): {
	cleanIri: string
	type?: string
} {
	/** Try standards-compliant parsing first */
	try {
		const url = new URL(input)
		let found: string | undefined = url.searchParams.get("type") ?? undefined
		if (found) {
			url.searchParams.delete("type")
		}
		/**
		 * Some sample IRIs had an invalid "&type=..." embedded in the pathname.
		 * Detect and remove it while capturing the type value.
		 */
		if (!found) {
			const m = url.pathname.match(/(.*?)[&?]type=([^\/?&#]+)/i)
			if (m) {
				url.pathname = m[1]
				found = m[2]
			}
		}
		/** Reconstruct URL, remove any trailing ? left after deletions. */
		const clean = url.toString().replace(/\?$/, "")
		return { cleanIri: clean, type: found?.toLowerCase() }
	} catch {
		/** Fallback: best-effort regex cleanup on non-URL strings */
		const m = input.match(/(^|[?&#&])type=([^&?#]+)/i)
		const type = m?.[2]?.toLowerCase()
		let clean = input
		clean = clean.replace(/([?&#&])type=([^&?#]+)/i, "$1")
		clean = clean.replace(/\?&/, "?").replace(/[?&]$/, "")
		return { cleanIri: clean, type }
	}
}
