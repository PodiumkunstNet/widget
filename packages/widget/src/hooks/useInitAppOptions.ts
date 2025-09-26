import { useEffect } from "react"

import { AppOptions } from "../utils/app-options"
import { Actions } from "../state/actions"

export function useInitAppOptions(dispatch: React.Dispatch<any>) {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const optionsStr = params.get("options")
		const payload = JSON.parse(optionsStr ?? "{}") as AppOptions

		dispatch({
			type: Actions.Init,
			payload
		})
	}, [])
}