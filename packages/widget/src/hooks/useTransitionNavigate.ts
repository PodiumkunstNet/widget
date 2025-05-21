import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export interface ExtendedDocument extends Document {
	startViewTransition: any
}

/**
 * Utilise the new View Transition API to animate page transitions. 
 * 
 * To use the View Transition API, we can't use React Router Link,
 * but have to rely on this `navigate` wrapper function.
 * 
 * See components/Layout/index.module.css for root and main transition
 * styles.
 */
export function useTransitionNavigate() {
	const reactRouterNavigate = useNavigate()

	const navigate = useCallback((url: string) => {
		const extendedDocument = document as ExtendedDocument
		if (!extendedDocument.startViewTransition) {
			reactRouterNavigate(url)
		} else {
			extendedDocument.startViewTransition(() => {
				reactRouterNavigate(url)
			})
		}
	}, [])

	const back = useCallback(() => {
		const extendedDocument = document as ExtendedDocument
		if (!extendedDocument.startViewTransition) {
			reactRouterNavigate(-1)
		} else {
			extendedDocument.startViewTransition(() => {
				reactRouterNavigate(-1)
			})
		}
	}, [])

	return { navigate, back }
}
