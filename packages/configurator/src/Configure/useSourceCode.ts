// import { type AppOptions } from "@widget/main"
// import { WidgetSubType } from "@widget/types/mainWidgetData"
// import { useState, useEffect } from "react"

// export function useSourceCode(
// 	id: string,
// 	orientation: Orientation,
// 	size: SizeValue,
// 	primaryColor: string,
// 	secondaryColor: string,
// ) {
// 	const [source, setSource] = useState("")

// 	useEffect(() => {
// 		const options: AppOptions = { pc: primaryColor, sc: secondaryColor }

// 		const url = getURL(id, WidgetSubType.Work, options)

// 		const [ width, height ] = orientation === Orientation.Landscape
// 			? sizes[size]
// 			: structuredClone(sizes[size]).reverse()

// 		setSource(`<iframe width="${width}" height="${height}" id=${IFRAME_ID} title=${accessibilityTitle} src="${url}" frameborder="0"></iframe>`)
// 	}, [id, orientation, size, primaryColor, secondaryColor])

// 	return source
// }

// const getURL = (id: string, type: WidgetSubType, options: AppOptions) => {
// 	const origin = (import.meta.env.MODE === "development")
// 		? "http://localhost:3001"
// 		: window.location.origin

// 	const encodedOptions = encodeURIComponent(JSON.stringify(options))

// 	return `${origin}/widget?id=${id}&type=${type}&options=${encodedOptions}`

// }
